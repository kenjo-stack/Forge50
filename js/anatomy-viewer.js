/* Offline WebGL anatomy viewer. Geometry is loaded once, and a guide owns at
   most one disposable WebGL context. Frames are drawn only after interaction. */
(() => {
  'use strict';
  let modelPromise=null,active=null;
  const frames={upper:{y:0,zoom:.67},core:{y:-.5,zoom:.88},lower:{y:-2.05,zoom:.66},calves:{y:-2.85,zoom:1.25}};
  const vertexSource=`attribute vec3 aP;attribute vec3 aN;attribute float aG;
uniform float yaw,pitch,zoom,aspect,centerY,outline;
varying vec3 p,n;varying float group;
vec3 rot(vec3 q){float c=cos(yaw),s=sin(yaw);vec3 r=vec3(c*q.x+s*q.z,q.y,-s*q.x+c*q.z);c=cos(pitch);s=sin(pitch);return vec3(r.x,c*r.y-s*r.z,s*r.y+c*r.z);}
void main(){p=aP;group=aG;n=rot(aN);vec3 q=rot(aP+normalize(aN)*outline-vec3(0.,centerY,0.));gl_Position=vec4(q.x*zoom/aspect,q.y*zoom,-q.z/10.,1.);}`;
  const fragmentSource=`precision highp float;varying vec3 p,n;varying float group;uniform float outline;
void main(){if(outline>0.||group>3.5){gl_FragColor=vec4(.79,.49,1.,1.);return;}
vec3 N=normalize(n);if(!gl_FrontFacing)N=-N;vec3 base=vec3(.47,.47,.49);
if(group>.5&&group<1.5)base=vec3(.96,.36,.075);if(group>1.5&&group<2.5)base=vec3(.045,.51,.91);if(group>2.5)base=vec3(.62,.60,.56);
float key=max(0.,dot(N,normalize(vec3(-.5,.9,1.3))));float fill=max(0.,dot(N,normalize(vec3(.8,.1,.5))));float rim=pow(1.-abs(N.z),3.);
float fiber=sin((p.y+abs(p.x)*.54)*330.+sin(p.z*24.)*.9);float texture=group<2.5?.975+fiber*.022:1.;
vec3 col=base*(.29+key*.64+fill*.27)*texture+vec3(.25,.31,.40)*rim*.22;
float spec=pow(max(0.,dot(reflect(-normalize(vec3(-.5,.9,1.3)),N),vec3(0.,0.,1.))),26.);col+=spec*.14;gl_FragColor=vec4(pow(col,vec3(.82)),1.);}`;
  const pickVertex=`attribute vec3 aP;attribute float aId;uniform float yaw,pitch,zoom,aspect,centerY;varying float partId;
vec3 rot(vec3 q){float c=cos(yaw),s=sin(yaw);vec3 r=vec3(c*q.x+s*q.z,q.y,-s*q.x+c*q.z);c=cos(pitch);s=sin(pitch);return vec3(r.x,c*r.y-s*r.z,s*r.y+c*r.z);}
void main(){partId=aId;vec3 q=rot(aP-vec3(0.,centerY,0.));gl_Position=vec4(q.x*zoom/aspect,q.y*zoom,-q.z/10.,1.);}`;
  const pickFragment=`precision highp float;varying float partId;
void main(){float id=floor(partId+.5);gl_FragColor=vec4(mod(id,256.)/255.,floor(id/256.)/255.,0.,1.);}`;
  const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  async function loadModel(){
    if(modelPromise)return modelPromise;
    modelPromise=(async()=>{
      const metaResponse=await fetch('assets/anatomy/parts.json');
      if(!metaResponse.ok)throw Error('Anatomy download failed');
      const meta=await metaResponse.json();
      if(!Array.isArray(meta.chunks)||!meta.chunks.length||meta.chunks.some(name=>!/^body-\d{2}\.bin$/.test(name)))throw Error('Invalid anatomy manifest');
      const chunks=await Promise.all(meta.chunks.map(async name=>{
        const response=await fetch('assets/anatomy/'+name);
        if(!response.ok)throw Error('Anatomy download failed');
        return response.arrayBuffer();
      }));
      let buffer=await new Blob(chunks).arrayBuffer();
      if(buffer.byteLength!==meta.compressedBytes)throw Error('Incomplete anatomy download');
      if(new Uint8Array(buffer)[0]===31){
        if(typeof DecompressionStream==='undefined')throw Error('Compressed anatomy is not supported');
        buffer=await new Response(new Blob([buffer]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
      }
      const d=new DataView(buffer);
      if(buffer.byteLength<16||d.getUint32(0)!==0x46353041||d.getUint32(4,true)!==1||meta.version!==1)throw Error('Invalid anatomy format');
      const count=d.getUint32(8,true),indexCount=d.getUint32(12,true);
      if(count!==meta.vertexCount||indexCount!==meta.indexCount||buffer.byteLength!==16+count*6+indexCount*4)throw Error('Incomplete anatomy data');
      const vertices=new Float32Array(count*7),indices=new Uint32Array(indexCount);
      for(let i=0;i<count;i++)for(let k=0;k<3;k++)vertices[i*7+k]=d.getInt16(16+i*6+k*2,true)/meta.positionScale;
      for(let i=0;i<indexCount;i++){indices[i]=d.getUint32(16+count*6+i*4,true);if(indices[i]>=count)throw Error('Invalid anatomy index');}
      for(let i=0;i<indexCount;i+=3){
        const a=indices[i]*7,b=indices[i+1]*7,c=indices[i+2]*7;
        const ux=vertices[b]-vertices[a],uy=vertices[b+1]-vertices[a+1],uz=vertices[b+2]-vertices[a+2],vx=vertices[c]-vertices[a],vy=vertices[c+1]-vertices[a+1],vz=vertices[c+2]-vertices[a+2];
        const nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx;
        for(const q of [a,b,c]){vertices[q+3]+=nx;vertices[q+4]+=ny;vertices[q+5]+=nz;}
      }
      for(let i=0;i<count;i++){const q=i*7+3,len=Math.hypot(vertices[q],vertices[q+1],vertices[q+2])||1;vertices[q]/=len;vertices[q+1]/=len;vertices[q+2]/=len;}
      for(const part of meta.parts){
        if(part.vertexStart+part.vertexCount>count||part.indexStart+part.indexCount>indexCount)throw Error('Invalid anatomy part');
        if(part.bone)for(let i=part.vertexStart;i<part.vertexStart+part.vertexCount;i++)vertices[i*7+6]=3;
      }
      return {vertices,indices,parts:meta.parts};
    })().catch(error=>{modelPromise=null;throw error;});
    return modelPromise;
  }

  function render(id){
    if(!AnatomyMaps.exercises[id])return window.MuscleDiagrams?.render(id)||'';
    return `<section class="anatomy-viewer" data-anatomy-id="${id}" aria-label="Interactive muscle guide">
      <div class="anatomy-mode" role="group" aria-label="Muscle view"><button type="button" data-anatomy-mode="3d" aria-pressed="true">3D anatomy</button><button type="button" data-anatomy-mode="image" aria-pressed="false">Illustration</button></div>
      <p class="anatomy-message" role="status" hidden></p>
      <div class="anatomy-live"><div class="anatomy-controls" role="group" aria-label="3D camera"><button type="button" data-anatomy-view="front">Front</button><button type="button" data-anatomy-view="back">Back</button><button type="button" data-anatomy-zoom="out" aria-label="Zoom out">−</button><button type="button" data-anatomy-zoom="in" aria-label="Zoom in">+</button><button type="button" data-anatomy-reset aria-label="Reset 3D view">Reset</button></div>
      <div class="anatomy-stage"><canvas role="img" aria-label="Rotatable anatomy. Tap a muscle to see its name and training history; drag to rotate and pinch to zoom."></canvas><span class="anatomy-status" role="status">Loading 3D anatomy…</span></div>
      <div class="anatomy-legend"><span><i class="primary"></i>Primary</span><span><i class="secondary"></i>Secondary</span><span><i class="focus"></i>Training focus</span></div>
      <div class="anatomy-history" role="region" aria-live="polite" aria-label="Muscle training history"><p>Tap a muscle to see related exercises and your recent training.</p><button type="button" data-anatomy-focus>Show this exercise’s focus</button></div></div>
      <div class="anatomy-illustration" hidden>${window.MuscleDiagrams?.render(id)||''}</div>
      <details class="anatomy-credit"><summary>3D model credits</summary><p>Adapted from <a href="https://github.com/JohanBellander/BodyExplorer" target="_blank" rel="noopener">BodyExplorer</a>: BodyParts3D © DBCLS (<a href="https://creativecommons.org/licenses/by-sa/2.1/jp/" target="_blank" rel="noopener">CC BY-SA 2.1 Japan</a>) and Z-Anatomy by Gauthier Kervyn (<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a>). Geometry simplified and colored for Forge50.</p></details>
    </section>`;
  }

  function focusArrows(parts,view){
    const result=[],back=view==='back',sideGroups=[parts.filter(p=>p.name.includes('left')),parts.filter(p=>p.name.includes('right'))];
    for(let side=0;side<sideGroups.length;side++){
      const list=sideGroups[side];if(!list.length)continue;
      const lo=[0,1,2].map(i=>Math.min(...list.map(p=>p.min[i]))),hi=[0,1,2].map(i=>Math.max(...list.map(p=>p.max[i])));
      const sign=side===0?1:-1,x=(lo[0]+hi[0])*.5,y=(lo[1]+hi[1])*.5,z=back?lo[2]-.05:hi[2]+.05;
      const start=x-sign*.17,end=x+sign*.045,h=.032,w=.008;
      const points=[[start,y-w,z],[end-sign*.055,y-w,z],[end-sign*.055,y+w,z],[start,y-w,z],[end-sign*.055,y+w,z],[start,y+w,z],[end-sign*.065,y-h,z],[end,y,z],[end-sign*.065,y+h,z]];
      for(const p of points)result.push(...p,0,0,back?-1:1,4);
    }
    return new Float32Array(result);
  }

  class Viewer {
    constructor(root,id){
      this.root=root;this.id=id;this.dead=false;this.abort=new AbortController();this.mode='3d';this.pending=false;this.gl=null;this.buffers=[];this.shaders=[];this.pointers=new Map();this.pinch=0;this.raf=0;this.dragged=false;
      this.listen(root,'click',e=>{
        const button=e.target.closest('button');if(!button)return;
        if(button.dataset.anatomyMode){this.setMode(button.dataset.anatomyMode);return;}
        if(!this.gl)return;
        if(button.hasAttribute('data-anatomy-focus')){this.showHistory(this.selection.focus[0]);return;}
        if(button.dataset.anatomyView){this.yaw=button.dataset.anatomyView==='back'?Math.PI:0;this.pitch=.015;}
        else if(button.dataset.anatomyZoom)this.zoom=Math.max(.25,Math.min(2.8,this.zoom*(button.dataset.anatomyZoom==='in'?1.15:1/1.15)));
        else if(button.hasAttribute('data-anatomy-reset'))this.reset();
        this.requestDraw();
      });
      this.start();
    }
    listen(el,event,fn,options={}){el.addEventListener(event,fn,{...options,signal:el===this.canvas&&this.canvasAbort?this.canvasAbort.signal:this.abort.signal});}
    setMode(mode){
      this.mode=mode;this.root.querySelector('.anatomy-live').hidden=mode!=='3d';this.root.querySelector('.anatomy-illustration').hidden=mode==='3d';
      this.root.querySelectorAll('[data-anatomy-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.anatomyMode===mode)));
      if(mode==='3d'){this.start();this.requestDraw();}
    }
    fallback(message){
      if(this.dead)return;
      const el=this.root.querySelector('.anatomy-message');el.textContent=message;el.hidden=false;this.root.dataset.anatomyState='fallback';this.setMode('image');this.releaseGL();
    }
    reset(){const f=frames[this.selection.frame];this.yaw=this.selection.view==='back'?Math.PI:0;this.pitch=.015;this.zoom=f.zoom;this.centerY=f.y;}
    async start(){
      if(this.dead||this.pending||this.gl)return;this.pending=true;
      try{
        const model=await loadModel();if(this.dead)return;
        this.model=model;
        this.selection=AnatomyMaps.select(this.id,model.parts);
        if(!this.selection?.primary.length||!this.selection.focus.length)throw Error('No anatomy mapping');
        const old=this.root.querySelector('canvas'),canvas=old.cloneNode();old.replaceWith(canvas);this.canvas=canvas;
        const gl=canvas.getContext('webgl',{alpha:true,antialias:true,preserveDrawingBuffer:true});
        if(!gl)throw Error('WebGL unavailable');this.gl=gl;
        if(!gl.getExtension('OES_element_index_uint'))throw Error('32-bit mesh indices unavailable');
        const vertices=model.vertices.slice(),primary=new Set(this.selection.primary),secondary=new Set(this.selection.secondary);
        for(const p of [...primary,...secondary])for(let i=p.vertexStart;i<p.vertexStart+p.vertexCount;i++)vertices[i*7+6]=primary.has(p)?1:2;
        const focus=new Uint32Array(this.selection.focus.reduce((n,p)=>n+p.indexCount,0));let at=0;
        for(const p of this.selection.focus){focus.set(model.indices.subarray(p.indexStart,p.indexStart+p.indexCount),at);at+=p.indexCount;}
        const compile=(type,src)=>{const s=gl.createShader(type);this.shaders.push(s);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Could not compile 3D shading');return s;};
        const program=gl.createProgram();this.program=program;gl.attachShader(program,compile(gl.VERTEX_SHADER,vertexSource));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragmentSource));gl.linkProgram(program);
        if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Could not link 3D shading');gl.useProgram(program);
        const picker=gl.createProgram();this.pickProgram=picker;gl.attachShader(picker,compile(gl.VERTEX_SHADER,pickVertex));gl.attachShader(picker,compile(gl.FRAGMENT_SHADER,pickFragment));gl.linkProgram(picker);
        if(!gl.getProgramParameter(picker,gl.LINK_STATUS))throw Error('Could not link muscle selection');
        const buffer=(target,data)=>{const b=gl.createBuffer();this.buffers.push(b);gl.bindBuffer(target,b);gl.bufferData(target,data,gl.STATIC_DRAW);return b;};
        this.vb=buffer(gl.ARRAY_BUFFER,vertices);this.ib=buffer(gl.ELEMENT_ARRAY_BUFFER,model.indices);this.fb=buffer(gl.ELEMENT_ARRAY_BUFFER,focus);
        const ids=new Float32Array(vertices.length/7);model.parts.forEach((part,i)=>ids.fill(i+1,part.vertexStart,part.vertexStart+part.vertexCount));
        this.pickIds=buffer(gl.ARRAY_BUFFER,ids);this.pickAttrs=['aP','aId'].map(n=>gl.getAttribLocation(picker,n));this.pickUniform={};for(const n of ['yaw','pitch','zoom','aspect','centerY'])this.pickUniform[n]=gl.getUniformLocation(picker,n);
        const arrows=focusArrows(this.selection.focus,this.selection.view);this.ab=buffer(gl.ARRAY_BUFFER,arrows);
        this.indexCount=model.indices.length;this.focusCount=focus.length;this.arrowCount=arrows.length/7;
        this.attrs=['aP','aN','aG'].map(n=>gl.getAttribLocation(program,n));this.uniform={};for(const n of ['yaw','pitch','zoom','aspect','centerY','outline'])this.uniform[n]=gl.getUniformLocation(program,n);
        this.reset();this.bindInput();this.observer=new ResizeObserver(()=>this.requestDraw());this.observer.observe(this.root.querySelector('.anatomy-stage'));
        this.root.dataset.anatomyState='ready';this.root.dataset.primaryCount=String(primary.size);this.root.dataset.focusCount=String(this.selection.focus.length);
        this.root.querySelector('.anatomy-message').hidden=true;this.root.querySelector('.anatomy-status').textContent='Tap a muscle · Drag to rotate · Pinch to zoom';this.requestDraw();
      }catch(error){this.fallback('3D is unavailable right now. You can use the illustration or try 3D again.');}
      finally{this.pending=false;}
    }
    bindInput(){
      this.canvasAbort=new AbortController();
      const c=this.canvas;
      const distance=()=>{const p=[...this.pointers.values()];return p.length===2?Math.hypot(p[0][0]-p[1][0],p[0][1]-p[1][1]):0;};
      this.listen(c,'pointerdown',e=>{if(!this.pointers.size){this.dragged=false;this.dragDistance=0;}else this.dragged=true;c.setPointerCapture(e.pointerId);this.pointers.set(e.pointerId,[e.clientX,e.clientY]);this.pinch=distance();});
      this.listen(c,'pointermove',e=>{
        if(!this.pointers.has(e.pointerId))return;const before=this.pointers.get(e.pointerId);this.pointers.set(e.pointerId,[e.clientX,e.clientY]);
        this.dragDistance+=Math.hypot(e.clientX-before[0],e.clientY-before[1]);if(this.dragDistance>7)this.dragged=true;
        if(this.pointers.size===1){this.yaw+=(e.clientX-before[0])*.009;this.pitch=Math.max(-.85,Math.min(.85,this.pitch+(e.clientY-before[1])*.007));}
        else{const d=distance();if(this.pinch&&d)this.zoom=Math.max(.25,Math.min(2.8,this.zoom*d/this.pinch));this.pinch=d;}
        this.requestDraw();
      });
      for(const event of ['pointerup','pointercancel','lostpointercapture'])this.listen(c,event,e=>{this.pointers.delete(e.pointerId);this.pinch=distance();});
      this.listen(c,'click',e=>{if(!this.dragged&&this.gl){const part=this.pickPart(e.clientX,e.clientY);if(part&&!part.bone)this.showHistory(part);else this.root.querySelector('.anatomy-status').textContent='Tap a muscle, or use the focus button below';}});
      this.listen(c,'wheel',e=>{e.preventDefault();this.zoom=Math.max(.25,Math.min(2.8,this.zoom-e.deltaY*.0007));this.requestDraw();},{passive:false});
      this.listen(c,'webglcontextlost',e=>{e.preventDefault();this.fallback('The 3D view was interrupted. The illustration is available; tap 3D anatomy to retry.');});
    }
    pickPart(clientX,clientY){
      this.draw();const gl=this.gl,c=this.canvas,r=c.getBoundingClientRect();
      const x=Math.floor((clientX-r.left)*c.width/r.width),y=c.height-1-Math.floor((clientY-r.top)*c.height/r.height);
      if(x<0||x>=c.width||y<0||y>=c.height)return null;
      gl.enable(gl.SCISSOR_TEST);gl.scissor(x,y,1,1);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
      gl.useProgram(this.pickProgram);
      for(const [name,value] of Object.entries({yaw:this.yaw,pitch:this.pitch,zoom:this.zoom,aspect:r.width/r.height,centerY:this.centerY}))gl.uniform1f(this.pickUniform[name],value);
      gl.bindBuffer(gl.ARRAY_BUFFER,this.vb);gl.enableVertexAttribArray(this.pickAttrs[0]);gl.vertexAttribPointer(this.pickAttrs[0],3,gl.FLOAT,false,28,0);
      gl.bindBuffer(gl.ARRAY_BUFFER,this.pickIds);gl.enableVertexAttribArray(this.pickAttrs[1]);gl.vertexAttribPointer(this.pickAttrs[1],1,gl.FLOAT,false,0,0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.ib);gl.drawElements(gl.TRIANGLES,this.indexCount,gl.UNSIGNED_INT,0);
      const pixel=new Uint8Array(4);gl.readPixels(x,y,1,1,gl.RGBA,gl.UNSIGNED_BYTE,pixel);gl.disable(gl.SCISSOR_TEST);this.requestDraw();
      return this.model.parts[pixel[0]+pixel[1]*256-1]||null;
    }
    showHistory(part){
      const details=AnatomyMaps.historyFor(part,window.Store?.state);if(!details)return;
      const role=this.selection.primary.includes(part)?'Primary':this.selection.secondary.includes(part)?'Secondary':'Other muscle';
      const related=details.related.map(e=>`<li>${escapeHTML(e.name)} <small>${e.role}</small></li>`).join('');
      const recent=details.recent.map(e=>`<li><strong>${escapeHTML(e.date)} · ${escapeHTML(e.name)}</strong><span>${e.sets.map(s=>escapeHTML(`${s.weight} kg × ${s.reps}`)).join(' · ')}</span></li>`).join('');
      this.root.querySelector('.anatomy-history').innerHTML=`<h3>${escapeHTML(details.name)}</h3><p class="anatomy-role">${role==='Other muscle'?'Anatomical reference':role+' for this exercise'}</p><h4>Related exercises</h4>${related?`<ul>${related}</ul>`:'<p>No built-in exercise targets this muscle.</p>'}<h4>Your recent training</h4>${recent?`<ul>${recent}</ul>`:'<p>No completed sets for these exercises yet.</p>'}<button type="button" data-anatomy-focus>Show this exercise’s focus</button>`;
    }
    requestDraw(){if(!this.dead&&this.mode==='3d'&&!this.raf)this.raf=requestAnimationFrame(()=>{this.raf=0;this.draw();});}
    draw(){
      const gl=this.gl;if(!gl||this.dead||this.mode!=='3d')return;
      const stage=this.root.querySelector('.anatomy-stage'),w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;
      const dpr=Math.min(devicePixelRatio||1,2),c=this.canvas;
      if(c.width!==Math.round(w*dpr)||c.height!==Math.round(h*dpr)){c.width=Math.round(w*dpr);c.height=Math.round(h*dpr);}
      gl.viewport(0,0,c.width,c.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.enable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);gl.useProgram(this.program);
      for(const [k,v] of Object.entries({yaw:this.yaw,pitch:this.pitch,zoom:this.zoom,aspect:w/h,centerY:this.centerY,outline:0}))gl.uniform1f(this.uniform[k],v);
      const bind=b=>{gl.bindBuffer(gl.ARRAY_BUFFER,b);this.attrs.forEach((a,i)=>{gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,i===2?1:3,gl.FLOAT,false,28,i*12);});};
      bind(this.vb);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.ib);gl.drawElements(gl.TRIANGLES,this.indexCount,gl.UNSIGNED_INT,0);
      gl.uniform1f(this.uniform.outline,.010);gl.enable(gl.CULL_FACE);gl.cullFace(gl.FRONT);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.fb);gl.drawElements(gl.TRIANGLES,this.focusCount,gl.UNSIGNED_INT,0);
      gl.disable(gl.CULL_FACE);gl.uniform1f(this.uniform.outline,0);bind(this.ab);gl.drawArrays(gl.TRIANGLES,0,this.arrowCount);
      this.root.querySelectorAll('[data-anatomy-view]').forEach(b=>{const target=b.dataset.anatomyView==='back'?Math.PI:0;const angle=Math.atan2(Math.sin(this.yaw-target),Math.cos(this.yaw-target));b.setAttribute('aria-pressed',String(Math.abs(angle)<.02));});
    }
    releaseGL(){
      if(this.raf){cancelAnimationFrame(this.raf);this.raf=0;}this.canvasAbort?.abort();this.canvasAbort=null;this.observer?.disconnect();this.observer=null;const gl=this.gl;this.gl=null;
      if(gl){for(const b of this.buffers)gl.deleteBuffer(b);for(const s of this.shaders)gl.deleteShader(s);if(this.program)gl.deleteProgram(this.program);if(this.pickProgram)gl.deleteProgram(this.pickProgram);gl.getExtension('WEBGL_lose_context')?.loseContext();}
      this.buffers=[];this.shaders=[];this.program=null;this.pickProgram=null;this.model=null;this.pointers.clear();
    }
    destroy(){
      this.dead=true;this.abort.abort();this.releaseGL();
    }
  }
  function mount(root,id){
    if(!root||!AnatomyMaps.exercises[id])return;
    if(active?.root===root){active.requestDraw();return;}
    dispose();active=new Viewer(root,id);
  }
  function dispose(){active?.destroy();active=null;}
  window.AnatomyViewer={render,mount,dispose,loadModel};
})();

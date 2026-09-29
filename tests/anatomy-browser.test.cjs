// Run with the same Playwright setup as browser.test.cjs.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES?process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright':'playwright');
const root=path.resolve(__dirname,'..'),errors=[],requests=[];
const mime={'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.gz':'application/gzip','.webp':'image/webp','.png':'image/png'};
const server=http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');requests.push(url.pathname);const relative=decodeURIComponent(url.pathname).replace(/^\/Forge50\//,'');
 const file=path.resolve(root,relative||'index.html');if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404);res.end();return;}
 res.setHeader('Content-Type',mime[path.extname(file)]||'text/plain');res.setHeader('Cache-Control','no-store');res.end(fs.readFileSync(file));
});
let browser;
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port+'/Forge50/';
 browser=await chromium.launch({headless:true,...(process.env.FORGE_BROWSER_PATH?{executablePath:process.env.FORGE_BROWSER_PATH}:{}),args:['--no-sandbox','--disable-dev-shm-usage','--no-zygote','--use-gl=angle','--use-angle=swiftshader']});
 const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url);await page.waitForFunction(()=>navigator.serviceWorker.controller);
 await context.setOffline(true);await page.reload();
 const ids=await page.evaluate(()=>Object.keys(ForgeDefaults.catalog));
 for(const id of ids){
  await page.evaluate(id=>ExerciseGuides.open(id),id);await page.locator('[data-guide-tab="muscles"]').click();assert.equal(await page.locator('.anatomy-illustration').isVisible(),true);await page.locator('[data-anatomy-mode="3d"]').click();
  await page.locator('.anatomy-viewer[data-anatomy-state="ready"]').waitFor();
  assert.ok(Number(await page.locator('.anatomy-viewer').getAttribute('data-primary-count'))>0,id);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 }
 console.log('PASS all catalog exercises open a real 3D view offline under the GitHub Pages subpath');
 for(const id of ['lat-pulldown','leg-press','machine-calf-raise']){
  await page.evaluate(id=>ExerciseGuides.open(id),id);await page.locator('[data-guide-tab="muscles"]').click();assert.equal(await page.locator('.anatomy-illustration').isVisible(),true);await page.locator('[data-anatomy-mode="3d"]').click();await page.locator('[data-anatomy-state="ready"]').waitFor();
  await page.locator('.anatomy-stage').screenshot({path:'/tmp/forge50-3d-'+id+'.png'});
 }
 await page.evaluate(()=>ExerciseGuides.open('lat-pulldown'));await page.locator('[data-guide-tab="muscles"]').click();assert.equal(await page.locator('.anatomy-illustration').isVisible(),true);await page.locator('[data-anatomy-mode="3d"]').click();await page.locator('[data-anatomy-state="ready"]').waitFor();
 const canvas=page.locator('.anatomy-stage canvas');await canvas.scrollIntoViewIfNeeded();const before=await canvas.screenshot();const box=await canvas.boundingBox();
 await page.mouse.move(box.x+80,box.y+130);await page.mouse.down();await page.mouse.move(box.x+190,box.y+140,{steps:8});await page.mouse.up();
 assert.notDeepEqual(await canvas.screenshot(),before);
 const cdp=await context.newCDPSession(page);const x=box.x+box.width/2,y=box.y+box.height/2;
 const pinchBefore=await canvas.screenshot();
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x-25,y,id:1},{x:x+25,y,id:2}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-55,y,id:1},{x:x+55,y,id:2}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 assert.notDeepEqual(await canvas.screenshot(),pinchBefore);
 await page.locator('[data-anatomy-reset]').click();await page.locator('[data-anatomy-view="front"]').click();assert.equal(await page.locator('[data-anatomy-view="front"]').getAttribute('aria-pressed'),'true');
 console.log('PASS drag rotation, two-finger zoom and camera buttons change the rendered model');
 await page.locator('[data-anatomy-mode="image"]').click();assert.equal(await page.locator('.anatomy-illustration').isVisible(),true);await page.locator('[data-anatomy-mode="3d"]').click();assert.equal(await canvas.isVisible(),true);
 await page.evaluate(()=>document.querySelector('.anatomy-stage canvas').getContext('webgl').getExtension('WEBGL_lose_context').loseContext());
 await page.locator('[data-anatomy-state="fallback"]').waitFor();assert.equal(await page.locator('.anatomy-illustration').isVisible(),true);
 await page.locator('[data-anatomy-mode="3d"]').click();await page.locator('[data-anatomy-state="ready"]').waitFor();
 await page.evaluate(()=>{ExerciseGuides.close();ExerciseGuides.open('cable-crunch');});await page.locator('[data-guide-tab="muscles"]').click();assert.equal(await page.locator('.anatomy-illustration').isVisible(),true);await page.locator('[data-anatomy-mode="3d"]').click();await page.locator('[data-anatomy-state="ready"]').waitFor();
 console.log('PASS illustration switching, context-loss recovery and guide reopening');
 const fallback=await browser.newContext({serviceWorkers:'block'});await fallback.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='webgl'?null:original.call(this,type,...args);};});
 await context.setOffline(false);const fp=await fallback.newPage();await fp.goto(url);await fp.evaluate(()=>ExerciseGuides.open('lat-pulldown'));await fp.locator('[data-guide-tab="muscles"]').click();await fp.locator('[data-anatomy-mode="3d"]').click();await fp.locator('[data-anatomy-state="fallback"]').waitFor();assert.equal(await fp.locator('.anatomy-illustration').isVisible(),true);
 assert.deepEqual(errors,[]);console.log('PASS unavailable WebGL falls back to the illustration; no uncaught errors');
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{await browser?.close();server.close();});

/* FORGE50 v2.0: versioned session storage. All mutations commit atomically. */
'use strict';
const Store = {
  KEY: 'forge50-v2',
  RECOVERY_KEY: 'forge50-before-restore',
  state: null,
  today() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; },
  date(d) { return new Date(`${d}T12:00:00`); },
  validDate(d) { return typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(this.date(d)) && this.localDate(this.date(d)) === d; },
  localDate(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; },
  addDays(d,n) { const dt=this.date(d);dt.setDate(dt.getDate()+n);return this.localDate(dt); },
  id() { return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`; },
  copy(x) { return JSON.parse(JSON.stringify(x)); },
  fresh() { return {schema:2,version:'2.0.0',profile:this.copy(ForgeDefaults.profile),templates:this.copy(ForgeDefaults.templates),cycle:{next:'chest',nextDate:this.today()},sessions:[],legacy:null,updatedAt:new Date().toISOString()}; },
  legacyInput() {
    const keys={history:'forge50-workoutHistory',currentProgress:'forge50-workoutProgress',exerciseLogs:'forge50-exerciseLogbook',personalRecords:'forge50-personalRecords'};
    const data={}; let found=false;
    for(const [name,key] of Object.entries(keys)) { const value=localStorage.getItem(key); if(value!==null){found=true;try{data[name]=JSON.parse(value);}catch{throw new Error(`The old ${name} data needs recovery. It has not been changed.`);}} }
    return found?data:null;
  },
  init() {
    const raw=localStorage.getItem(this.KEY);
    if(raw!==null) { let next;try{next=JSON.parse(raw);}catch{throw new Error('Saved data could not be read. Export a recovery copy or restore a backup below.');} this.validate(next);this.state=next;return; }
    const legacy=this.legacyInput(); const next=legacy?this.migrate(legacy):this.fresh();this.validate(next);
    localStorage.setItem(this.KEY,JSON.stringify(next));this.state=next;
  },
  commit(next) {
    this.validate(next);next.updatedAt=new Date().toISOString();
    try{localStorage.setItem(this.KEY,JSON.stringify(next));}catch{throw new Error('Your latest change could not be saved. Free device space or export your data before continuing.');}
    this.state=next;
  },
  change(fn) { const next=this.copy(this.state);const result=fn(next);this.commit(next);return result; },
  validate(s) {
    const fail=()=>{throw new Error('This backup has invalid or unsupported workout data. Your existing data has not been replaced.');};
    if(!s||s.schema!==2||!s.profile||!s.templates||!s.cycle||!Array.isArray(s.sessions))fail();
    if(!['chest','back','shoulders'].includes(s.cycle.next)||!this.validDate(s.cycle.nextDate))fail();
    const number=(n,min,max)=>typeof n==='number'&&Number.isFinite(n)&&n>=min&&n<=max;
    const text=(x,max=1000)=>typeof x==='string'&&x.length<=max;
    const ids=new Set();
    const safeId=x=>typeof x==='string'&&/^[a-zA-Z0-9_-]{1,180}$/.test(x);
    if(!text(s.profile.name,60)||Object.keys(s.templates).sort().join(',')!=='back,chest,legs,shoulders')fail();
    for(const key of ['chest','back','shoulders','legs']) {
      const t=s.templates[key];if(!t||t.id!==key||!text(t.title,100)||!Array.isArray(t.exercises)||t.exercises.length<1||t.exercises.length>40)fail();
      const exercises=new Set();
      for(const e of t.exercises){if(!safeId(e.id)||exercises.has(e.id)||!text(e.name,120)||!text(e.muscle,60)||!Number.isInteger(e.sets)||!number(e.sets,1,12)||!/^\d{1,3}-\d{1,3}$/.test(e.reps)||!number(e.rir,0,10)||!number(e.restSeconds,5,900)||!number(e.increment,0.25,50)||!['total','per-dumbbell','bodyweight'].includes(e.weightMode))fail();const [lo,hi]=e.reps.split('-').map(Number);if(lo<1||hi<lo||hi>100)fail();exercises.add(e.id);}
    }
    for(const session of s.sessions) {
      if(!session||!safeId(session.id)||ids.has(session.id)||!this.validDate(session.date)||!['lifting','cycling','rest'].includes(session.type)||!['draft','completed','archived'].includes(session.status)||!text(session.title,150))fail();ids.add(session.id);
      if(session.type==='cycling'&&(!number(session.minutes,1,1440)||!['easy','moderate','hard'].includes(session.effort)))fail();
      if(session.notes!=null&&!text(session.notes,5000))fail();
      if(session.type==='lifting'){
        if(!safeId(session.templateId)||!Array.isArray(session.exercises)||session.exercises.length>100)fail();
        for(const e of session.exercises){if(!safeId(e.id)||!text(e.name,120)||!text(e.muscle,60)||!Array.isArray(e.sets)||e.sets.length>200)fail();
          const setIds=new Set();
          if(e.notes!=null&&!text(e.notes,10000))fail();
          if(!session.legacy&&(!number(e.rir,0,10)||!number(e.restSeconds,5,900)||!number(e.increment,0.25,50)||!/^\d{1,3}-\d{1,3}$/.test(e.reps)||!['total','per-dumbbell','bodyweight'].includes(e.weightMode)))fail();
          for(const set of e.sets){if(!safeId(set.id)||setIds.has(set.id))fail();setIds.add(set.id);if(typeof set.done!=='boolean'||(set.weight!==null&&!number(set.weight,0,1000))||(set.reps!==null&&(!number(set.reps,1,200)||!Number.isInteger(set.reps)))||(set.rir!=null&&!number(set.rir,0,10))||set.done&&(set.weight===null||set.reps===null))fail();}
        }
      }
    }
  },
  migrate(data) {
    if(!data||typeof data!=='object'||!Array.isArray(data.history||[])||typeof(data.exerciseLogs||{})!=='object'||Array.isArray(data.exerciseLogs)||(!('history' in data)&&!('exerciseLogs' in data)&&!('currentProgress' in data)))throw new Error('This is not a recognised Forge50 backup.');
    const state=this.fresh();state.legacy=this.copy(data);if(data.profile&&typeof data.profile.name==='string')state.profile={...state.profile,...data.profile};
    const grouped=new Map();
    const get=(date,day)=>{
      if(!this.validDate(date)||typeof day!=='string')throw new Error('An old entry has an invalid date or workout. The original data is preserved.');
      const key=`${date}:${day}`;
      if(!grouped.has(key))grouped.set(key,{id:'legacy-'+this.id(),date,type:'lifting',status:'archived',templateId:day,title:ForgeDefaults.legacyWorkouts[day]?.title||`Previous workout · ${day}`,exercises:[],legacy:true,notes:'Imported from v1.5. Each entry is an exercise summary; individual sets were not recorded.',duration:0});
      return grouped.get(key);
    };
    for(const h of data.history||[]) {const s=get(h.date||String(h.timestamp||'').slice(0,10),h.workout);s.status='completed';s.legacyCompletion=h.percentage;s.duration=Number(h.duration)||0;}
    for(const logs of Object.values(data.exerciseLogs||{})){
      if(!Array.isArray(logs))throw new Error('Invalid exercise history in backup.');
      for(const log of logs){const s=get(log.date,log.day);const id=String(log.exercise||'Exercise').toLowerCase().replace(/[^a-z0-9]+/g,'-');let e=s.exercises.find(x=>x.id===id);
        if(!e){e={id,name:String(log.exercise||'Exercise'),muscle:ForgeDefaults.catalog[id]?.muscle||'Other',weightMode:'legacy',sets:[],notes:''};s.exercises.push(e);}
        const weight=Number(log.weight),reps=Number(log.reps);
        if(!Number.isFinite(weight)||weight<0||!Number.isInteger(reps)||reps<1)throw new Error('An old exercise entry has invalid numbers. The original backup is preserved.');
        e.sets.push({id:this.id(),weight,reps,rir:null,done:true,legacy:true});if(log.notes)e.notes+=(e.notes?'\n':'')+String(log.notes);
      }
    }
    for(const p of Object.values(data.currentProgress||{}))if(p&&p.workout&&p.date){const s=get(p.date,p.workout);s.legacyChecked=Array.isArray(p.completed)?p.completed:[];}
    state.sessions=[...grouped.values()];return state;
  },
  backup() { return {format:'forge50-backup',schema:2,appVersion:'2.0.0',exportDate:new Date().toISOString(),state:this.copy(this.state)}; },
  readBackup(data) {
    let s;if(data?.format==='forge50-backup'&&data.schema===2)s=this.copy(data.state);else if(data?.schema===2&&data.sessions)s=this.copy(data);else s=this.migrate(data);
    this.validate(s);return s;
  },
  restore(next) {
    this.validate(next);const previous=localStorage.getItem(this.KEY);
    if(previous!==null)localStorage.setItem(this.RECOVERY_KEY,previous);
    this.commit(this.copy(next));
  },
  session(id) { return this.state.sessions.find(s=>s.id===id); },
  start(templateId,date=this.today()) {
    if(!this.validDate(date)||date>this.today())throw new Error('Start a session today or on an earlier date. Use the home screen to plan a future workout.');
    const existing=this.state.sessions.find(s=>s.status==='draft'&&s.templateId===templateId&&s.date===date);if(existing)return existing.id;
    const t=this.state.templates[templateId];if(!t)throw new Error('Workout not found.');const id=this.id();
    this.change(state=>{state.sessions.push({id,type:'lifting',templateId,title:t.title,date,status:'draft',startedAt:new Date().toISOString(),notes:'',exercises:t.exercises.map(e=>({...this.copy(e),skipped:false,notes:'',sets:Array.from({length:e.sets},()=>({id:this.id(),weight:e.weightMode==='bodyweight'?0:null,reps:null,rir:null,done:false}))}))});});return id;
  },
  patchSession(id,fn){return this.change(state=>{const s=state.sessions.find(s=>s.id===id);if(!s)throw new Error('Session not found.');return fn(s,state);});},
  saveSet(id,exerciseId,setId,values) {
    const prior=this.best(exerciseId,this.session(id)?.exercises.find(e=>e.id===exerciseId)?.weightMode);
    this.patchSession(id,s=>{const e=s.exercises.find(e=>e.id===exerciseId);if(!e)throw new Error('Exercise not found.');const set=e.sets.find(x=>x.id===setId);if(!set)throw new Error('Set not found.');Object.assign(set,values);});
    return values.done&&values.weight!=null&&(!prior||values.weight>prior.weight||values.weight===prior.weight&&values.reps>prior.reps);
  },
  finish(id) {
    this.patchSession(id,(s,state)=>{
      if(s.status==='completed')return;
      if(!s.exercises.some(e=>e.sets.some(x=>x.done)))throw new Error('Log at least one completed set before finishing.');
      s.status='completed';s.finishedAt=new Date().toISOString();s.duration=Math.max(0,Math.round((Date.now()-new Date(s.startedAt))/60000));
      s.partial=s.exercises.some(e=>e.skipped||e.sets.some(x=>!x.done));
      const cycle=['chest','back','shoulders'];if(cycle.includes(s.templateId))state.cycle.next=cycle[(cycle.indexOf(s.templateId)+1)%3];
      // Legs preserve the upper-body sequence, while still allowing a day off weights.
      state.cycle.nextDate=[state.cycle.nextDate,this.addDays(s.date,2),this.today()].sort().pop();
    });
  },
  last(exerciseId,weightMode,excludeId) {return this.state.sessions.filter(s=>s.id!==excludeId&&s.type==='lifting'&&s.status==='completed'&&!s.legacy).sort((a,b)=>b.date.localeCompare(a.date)||String(b.finishedAt||'').localeCompare(String(a.finishedAt||''))).flatMap(s=>s.exercises.filter(e=>e.id===exerciseId&&e.weightMode===weightMode&&e.sets.some(x=>x.done)).map(e=>({date:s.date,exercise:e}))).shift();},
  recommend(e,excludeId) {
    const last=this.last(e.id,e.weightMode,excludeId);if(!last)return null;
    const sets=last.exercise.sets.filter(s=>s.done);const [min,max]=e.reps.split('-').map(Number);
    const enough=sets.length>=e.sets.length&&last.exercise.sets.every(s=>s.done)&&!last.exercise.skipped;
    const ready=enough&&sets.every(s=>s.reps>=max&&s.rir!==null&&s.rir>=e.rir)&&new Set(sets.map(s=>s.weight)).size===1;
    return {date:last.date,ready,sets:sets.map(s=>({weight:ready?Math.round((s.weight+e.increment)*100)/100:s.weight,reps:ready?min:Math.min(max,s.reps+1)})),reason:ready?`All working sets met the rep and effort targets. Try +${e.increment} kg if it feels appropriate.`:'Build reps at the current load. Record actual RIR on every set to qualify for a load increase.'};
  },
  best(id,mode) {let best=null;for(const s of this.state.sessions)if(!s.legacy&&s.type==='lifting')for(const e of s.exercises)if(e.id===id&&e.weightMode===mode)for(const set of e.sets)if(set.done&&(!best||set.weight>best.weight||set.weight===best.weight&&set.reps>best.reps))best={weight:set.weight,reps:set.reps,date:s.date};return best;},
  activity(type,date,minutes,effort,notes='') {
    if(!this.validDate(date)||date>this.today())throw new Error('Log an activity today or on an earlier date.');
    const id=this.id();this.change(s=>s.sessions.push({id,type,date,title:type==='cycling'?'Home cycling':'Day off weights',status:'completed',minutes:type==='cycling'?minutes:0,effort:type==='cycling'?effort:'easy',notes}));return id;
  },
  stats(days=7) {
    const start=this.addDays(this.today(),1-days),sessions=this.state.sessions.filter(s=>s.date>=start&&s.date<=this.today()&&s.status==='completed');
    const muscles={},byDate={};let volume=0,sets=0;
    for(const s of sessions)if(s.type==='lifting'&&!s.legacy)for(const e of s.exercises)for(const set of e.sets)if(set.done){sets++;muscles[e.muscle]=(muscles[e.muscle]||0)+1;const v=set.weight*set.reps*(e.weightMode==='per-dumbbell'?2:1);volume+=v;byDate[s.date]=(byDate[s.date]||0)+v;}
    return {lifting:sessions.filter(s=>s.type==='lifting').length,cycling:sessions.filter(s=>s.type==='cycling').reduce((n,s)=>n+s.minutes,0),sets,volume,muscles,byDate};
  }
};
window.Store=Store;

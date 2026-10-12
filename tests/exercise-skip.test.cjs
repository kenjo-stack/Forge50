// Run: node tests/exercise-skip.test.cjs (no packages or browser required).
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
function make(){
 const db=new Map(),focus=[],scroll=[],notices=[],listeners={};let cards=[],renders=0,html='',timerPauses=0;
 const target=id=>({setAttribute(){},focus(options){focus.push({id,options});},scrollIntoView(options){scroll.push({id,options});}}),finish=target('finish');
 const c={console,crypto,Date,localStorage:{getItem:key=>db.get(key)??null,setItem:(key,value)=>db.set(key,String(value)),removeItem:key=>db.delete(key)},
  document:{addEventListener(name,fn){listeners[name]=fn;},querySelector(selector){return selector==='[data-action="finish"]'?finish:null;},querySelectorAll(selector){return selector==='.exercise-card'?cards:[];}},
  Timer:{format(){return '02:00';},pause(){timerPauses++;}},
  ExerciseGuides:{resolve(){return {guide:{}};}},WorkoutCockpit:{map(){return '';},demo(){return '';},steppers(){return '';},timer(){return '';}}
 };
 c.window=c;vm.createContext(c);
 for(const file of ['data.js','js/exercise-catalog-expansion.js','js/store.js','js/app.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c);
 const S=c.Store,A=c.App;S.init();A.activeId=S.start('chest');A.page='workout';A.coachTarget=()=>null;A.toast=message=>notices.push(message);
 A.render=function(){renders++;const s=S.session(A.activeId);html=A.guidedMode?A.guidedWorkout(s):s.exercises.map(e=>A.exerciseCard(s,e)).join('');cards=s.exercises.map(e=>({dataset:{exercise:e.id},querySelector(){return target(e.id);}}));};
 const click=exercise=>A.action('skip-exercise',{dataset:{exercise}}),session=()=>S.session(A.activeId);
 return {S,A,c,db,focus,scroll,notices,click,session,get renders(){return renders;},get html(){return html;},get timerPauses(){return timerPauses;}};
}
function log(S,s,e,index=0){S.saveSet(s.id,e.id,e.sets[index].id,{weight:20,reps:10,rir:2,done:true});}
function snapshot(value){return JSON.stringify(value);}
let passed=0;
async function test(name,fn){await fn();passed++;console.log('PASS',name);}
(async()=>{
 await test('guided Skip advances past skipped and completed exercises to the next unlogged set',async()=>{
  const h=make(),{S,A}=h,s=h.session();A.guidedMode=true;
  log(S,s,s.exercises[0]);
  S.patchSession(s.id,session=>{session.exercises[1].skipped=true;});
  for(let i=0;i<s.exercises[2].sets.length;i++)log(S,s,s.exercises[2],i);
  log(S,s,s.exercises[3]);
  const sets=snapshot(h.session().exercises[0].sets),templates=snapshot(S.state.templates),cycle=snapshot(S.state.cycle);
  await h.click(s.exercises[0].id);
  assert.equal(A.guidedExerciseIndex,3);assert.equal(A.guidedSetIndex,1);assert.equal(h.session().exercises[0].skipped,true);
  assert.equal(snapshot(h.session().exercises[0].sets),sets);assert.equal(snapshot(S.state.templates),templates);assert.equal(snapshot(S.state.cycle),cycle);
  const restored=S.readBackup(S.backup()).sessions.find(session=>session.id===s.id);
  assert.equal(restored.exercises[0].skipped,true);assert.equal(snapshot(restored.exercises[0].sets),sets);
  assert.equal(h.session().status,'draft');assert.equal(h.renders,1);
 });
 await test('guided Unskip returns to the exercise with its first unlogged set and preserved loads',async()=>{
  const h=make(),{A,S}=h,s=h.session();A.guidedMode=true;log(S,s,s.exercises[0]);
  await h.click(s.exercises[0].id);assert.equal(A.guidedExerciseIndex,1);
  await A.action('cockpit-jump',{dataset:{index:'0'}});assert.match(h.html,/Unskip exercise/);
  await h.click(s.exercises[0].id);
  assert.equal(A.guidedExerciseIndex,0);assert.equal(A.guidedSetIndex,1);assert.equal(h.session().exercises[0].skipped,false);
  assert.equal(h.session().exercises[0].sets[0].weight,20);assert.equal(h.session().exercises[0].sets[0].done,true);
 });
 await test('skipping the final pending exercise shows an accurate review, without finishing the workout',async()=>{
  const h=make(),{A,S}=h,s=h.session();A.guidedMode=true;
  for(const e of s.exercises.slice(0,-1))for(let i=0;i<e.sets.length;i++)log(S,s,e,i);
  A.guidedExerciseIndex=s.exercises.length-1;
  await h.click(s.exercises.at(-1).id);
  assert.equal(A.guidedExerciseIndex,s.exercises.length);assert.equal(A.guidedSetIndex,0);assert.equal(h.timerPauses,1);
  assert.match(h.html,/READY TO REVIEW/);assert.match(h.html,/No exercises left to log/);assert.doesNotMatch(h.html,/ALL SETS COMPLETE/);
  assert.equal(h.session().status,'draft');assert.equal(S.state.cycle.next,'chest');
 });
 await test('end-of-routine navigation keeps earlier unfinished sets reachable and all-skipped sessions recoverable',async()=>{
  const h=make(),{A,S}=h,s=h.session();A.guidedMode=true;A.guidedExerciseIndex=s.exercises.length-1;
  await h.click(s.exercises.at(-1).id);
  assert.match(h.html,/Sets still to log/);assert.match(h.html,/Resume next unlogged set/);
  await A.action('guided-unlogged',{dataset:{}});assert.equal(A.guidedExerciseIndex,0);
  S.patchSession(s.id,session=>{for(const e of session.exercises)e.skipped=true;session.exercises[0].skipped=false;});
  await h.click(s.exercises[0].id);
  assert.match(h.html,/Tap a skipped exercise above to unskip it and log a set/);assert.doesNotMatch(h.html,/ALL SETS COMPLETE/);
  assert.equal(h.session().status,'draft');
 });
 await test('full workout exposes one Skip quick action, focuses the next pending card, and supports Unskip',async()=>{
  const h=make(),{A,S}=h,s=h.session();log(S,s,s.exercises[0]);
  S.patchSession(s.id,session=>{session.exercises[1].skipped=true;});
  for(let i=0;i<s.exercises[2].sets.length;i++)log(S,s,s.exercises[2],i);
  const html=A.exerciseCard(h.session(),h.session().exercises[0]);
  assert.equal((html.match(/data-action="skip-exercise"/g)||[]).length,1);
  assert.ok(html.indexOf('data-action="skip-exercise"')<html.indexOf('<details class="exercise-tools"'));
  const before=snapshot(h.session().exercises[0].sets);await h.click(s.exercises[0].id);
  assert.equal(h.focus.at(-1).id,s.exercises[3].id);assert.equal(h.scroll.at(-1).id,s.exercises[3].id);
  assert.equal(h.focus.at(-1).options.preventScroll,true);assert.equal(h.scroll.at(-1).options.block,'start');
  assert.match(A.exerciseCard(h.session(),h.session().exercises[0]),/Unskip exercise/);
  await h.click(s.exercises[0].id);
  assert.equal(h.session().exercises[0].skipped,false);assert.equal(h.focus.at(-1).id,s.exercises[0].id);
  assert.equal(snapshot(h.session().exercises[0].sets),before);assert.equal(A.guidedMode,false);
 });
 await test('full workout focuses Finish when no later exercise is pending, leaving the session saved as a draft',async()=>{
  const h=make(),s=h.session();await h.click(s.exercises.at(-1).id);
  assert.equal(h.focus.at(-1).id,'finish');assert.equal(h.scroll.at(-1).id,'finish');assert.equal(h.session().status,'draft');
 });
 await test('missing, finished and fully logged exercises cannot be skipped',async()=>{
  const h=make(),{A,S}=h,s=h.session();
  await assert.rejects(h.click('missing-exercise'),/workout in progress/);
  for(let i=0;i<s.exercises[0].sets.length;i++)log(S,s,s.exercises[0],i);
  const before=snapshot(S.state);await assert.rejects(h.click(s.exercises[0].id),/already logged/);assert.equal(snapshot(S.state),before);
  assert.equal(A.skipExerciseButton(h.session(),h.session().exercises[0]),'');
  S.finish(s.id);const saved=snapshot(S.state);await assert.rejects(h.click(s.exercises[1].id),/workout in progress/);
  assert.equal(snapshot(S.state),saved);assert.equal(A.skipExerciseButton(h.session(),h.session().exercises[1]),'');
 });
 await test('failed persistence does not mark an exercise skipped or advance navigation',async()=>{
  const h=make(),{A,S}=h,s=h.session();A.guidedMode=true;const before=snapshot(S.state),stored=h.db.get(S.KEY);
  h.c.localStorage.setItem=()=>{throw new Error('quota');};
  await assert.rejects(h.click(s.exercises[0].id));
  assert.equal(snapshot(S.state),before);assert.equal(h.db.get(S.KEY),stored);assert.equal(A.guidedExerciseIndex,0);assert.equal(h.renders,0);assert.equal(h.focus.length,0);
 });
 console.log(`${passed} skip regression checks passed.`);
})().catch(error=>{console.error(error);process.exitCode=1;});

/* Offline, explainable training suggestions. Reading a report never writes data. */
'use strict';
window.TrainingCoach={
 history(e,excludeId){return Store.state.sessions.filter(s=>s.id!==excludeId&&s.type==='lifting'&&s.status==='completed'&&!s.legacy&&s.date<=Store.today()&&s.date>=Store.addDays(Store.today(),-84)).sort((a,b)=>b.date.localeCompare(a.date)||String(b.finishedAt||'').localeCompare(String(a.finishedAt||''))||Store.state.sessions.indexOf(b)-Store.state.sessions.indexOf(a)).flatMap(s=>s.exercises.filter(x=>x.id===e.id&&x.weightMode===e.weightMode&&x.reps===e.reps&&x.sets.some(v=>v.done)).map(x=>({session:s,exercise:x,sets:x.sets.filter(v=>v.done)})));},
 expected(e){return Array.isArray(e.sets)?e.sets.length:e.sets;},
 complete(h,e){return !h.exercise.skipped&&h.exercise.sets.every(s=>s.done)&&h.sets.length===this.expected(e);},
 improved(a,b){if(a.sets.length!==b.sets.length)return false;const same=a.sets.every((s,i)=>s.weight===b.sets[i].weight);return same?a.sets.reduce((n,s)=>n+s.reps,0)>b.sets.reduce((n,s)=>n+s.reps,0):a.sets.every((s,i)=>s.weight>=b.sets[i].weight&&s.reps>=b.sets[i].reps)&&a.sets.some((s,i)=>s.weight>b.sets[i].weight);},
 suggestion(e,excludeId,checkIn){
  const history=this.history(e,excludeId),last=history[0],result={id:e.id,name:e.name,mode:e.weightMode,history:history.length,targets:[],kind:'baseline',title:'Build your baseline',reason:'Log a completed session with weight, reps and RIR to get a personalised target.'};
  if(checkIn?.pain&&checkIn.pain!=='none'){return {...result,kind:'caution',title:'Comfort comes first',reason:'No progression target today. Skip movements that aggravate symptoms and seek professional advice for persistent or worsening pain.'};}
  if(!last)return result;
  result.date=last.session.date;result.last=last.sets;
  if(!checkIn&&last.session.coachCheckIn?.pain&&last.session.coachCheckIn.pain!=='none')return {...result,kind:'caution',title:'Check how you feel',reason:'Discomfort was recorded last time. Complete today’s check-in before considering progression.'};
  if(checkIn?.energy==='fatigued')return {...result,kind:'hold',title:'Keep today manageable',reason:'You reported fatigue. Hold progression, use a comfortable load and consider skipping optional sets.'};
  const [min,max]=e.reps.split('-').map(Number),complete=this.complete(last,e),effort=last.sets.every(s=>s.rir!==null&&s.rir!==undefined&&s.rir>=e.rir),sameWeight=new Set(last.sets.map(s=>s.weight)).size===1;
  if(!complete||!effort)return {...result,kind:'hold',title:'Repeat and reassess',reason:!complete?'Last session was incomplete or the set count changed. Finish comfortable working sets before increasing the load.':'RIR was missing or below your target. Repeat a comfortable load and record how many reps you had left.'};
  const eligible=history.slice(0,3);const stalled=eligible.length===3&&eligible.every(h=>this.complete(h,e))&&eligible.every(h=>h.sets.every((s,i)=>s.weight===last.sets[i].weight))&&!this.improved(eligible[0],eligible[1])&&!this.improved(eligible[1],eligible[2]);
  if(sameWeight&&last.sets.every(s=>s.reps>=max)&&e.weightMode!=='bodyweight'&&last.sets[0].weight>0){
   const load=last.sets[0].weight;if(e.increment/load<=0.10)return {...result,kind:'increase',title:'Ready for a small increase',targets:last.sets.map(s=>({weight:Math.round((s.weight+e.increment)*100)/100,reps:min})),reason:`All sets reached the top of your rep range with target RIR. Consider +${e.increment} kg, starting at ${min} reps. Confirm the increment is available and comfortable.`};
   return {...result,kind:'hold',title:'Keep the current load',reason:'Your configured increment exceeds 10% of this load. Keep the load or review a smaller available increment in routine settings.'};
  }
  if(stalled)return {...result,kind:'review',title:'Review a possible plateau',reason:'No rep improvement across three comparable completed sessions at the same loads. Check rest, technique and recovery before adding weight or sets.'};
  return {...result,kind:'reps',title:'Build reps first',targets:last.sets.map(s=>({weight:s.weight,reps:Math.min(max,Math.max(min,s.reps+1))})),reason:'Keep the load and aim for one more rep where comfortable, within your rep range and target RIR.'};
 },
 summary(){const groups=Store.muscleStats(28),stats=Store.stats(28),start=Store.addDays(Store.today(),-27);const exercises=[...new Map(Object.values(Store.state.templates).flatMap(t=>t.exercises).map(e=>[e.id,e])).values()];const improved=exercises.filter(e=>{const h=this.history(e).filter(x=>x.session.date>=start&&this.complete(x,e));return h.length>=2&&this.improved(h[0],h[h.length-1]);});return {groups,stats,improved,start};}
};

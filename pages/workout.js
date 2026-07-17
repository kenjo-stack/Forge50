// ==========================================
// ⚒ FORGE50 v0.5
// Workout Page
// ==========================================

const WorkoutPage = {

currentDay: "sunday",

load(day = "sunday") {

this.currentDay = day;

const workout = appData.workouts[day];

let html = `

<div class="card">

<h1>${workout.title}</h1>

<p>${workout.focus.join(" • ")}</p>

</div>

<div class="card">

<h2>Select Workout</h2>

<div class="day-buttons">

<button class="day-btn ${day==="sunday"?"active":""}"
onclick="WorkoutPage.load('sunday')">

Sunday

</button>

<button class="day-btn ${day==="tuesday"?"active":""}"
onclick="WorkoutPage.load('tuesday')">

Tuesday

</button>

<button class="day-btn ${day==="wednesday"?"active":""}"
onclick="WorkoutPage.load('wednesday')">

Wednesday / Thursday

</button>

<button class="day-btn ${day==="friday"?"active":""}"
onclick="WorkoutPage.load('friday')">

Friday

</button>

</div>

</div>

`;

workout.exercises.forEach((exercise,index)=>{

html += `

<div class="card exercise-card">

<h2>${index+1}. ${exercise.name}</h2>

<p>

<strong>Sets:</strong> ${exercise.sets}<br>

<strong>Reps:</strong> ${exercise.reps}<br>

<strong>RIR:</strong> ${exercise.rir}<br>

<strong>Rest:</strong> ${exercise.rest}

</p>

${exercise.notes ? `<p class="small">${exercise.notes}</p>` : ""}

<label>

<input
type="checkbox"
class="exercise-check"
onchange="updateWorkoutProgress()">

Completed

</label>

</div>

`;

});

html += `

<div class="card">

<h2>Workout Progress</h2>

<div class="progress-bar">

<div
class="progress-fill"
style="width:0%">

</div>

</div>

<p id="progressText">

0%

</p>

</div>

<div class="card">

<h2>Rest Timer</h2>

<div
id="timerDisplay"
class="timer-display">

02:00

</div>

<div class="timer-buttons">

<button
class="primary-btn"
onclick="Timer.start()">

▶ Start

</button>

<button
class="secondary-btn"
onclick="Timer.pause()">

⏸ Pause

</button>

<button
class="secondary-btn"
onclick="Timer.reset()">

↺ Reset

</button>

</div>

</div>

<nav class="bottom-nav">

<button onclick="App.showHome()">

🏠<br>Home

</button>

<button class="active">

💪<br>Workout

</button>

<button onclick="App.showProgress()">

📈<br>Progress

</button>

<button onclick="App.showSettings()">

⚙<br>Settings

</button>

</nav>

`;

document.getElementById("app").innerHTML = html;

updateWorkoutProgress();

}

};

function updateWorkoutProgress(){

const checks =
document.querySelectorAll(".exercise-check");

const completed =
document.querySelectorAll(".exercise-check:checked");

const percent =
checks.length
? Math.round((completed.length/checks.length)*100)
:0;

const fill =
document.querySelector(".progress-fill");

if(fill){

fill.style.width = percent + "%";

}

const text =
document.getElementById("progressText");

if(text){

text.textContent =
`${completed.length} / ${checks.length} Exercises (${percent}%)`;

}

}
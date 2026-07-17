// ==========================================
// ⚒ FORGE50 v0.5
// Home Page
// ==========================================

const HomePage = {

render() {

const html = `

<div class="card hero-card">

<h1>⚒ FORGE50</h1>

<p>Upper Body Hypertrophy Specialist</p>

</div>

<div class="card">

<h2>Today's Workout</h2>

<p><strong>${this.getTodayWorkout()}</strong></p>

<button class="primary-btn"
onclick="App.showWorkout(App.currentWorkout)">

Start Workout

</button>

</div>

<div class="card">

<h2>Weekly Split</h2>

<ul class="split-list">

<li><strong>Sunday</strong> — Chest • Side/Rear Delts • Triceps • Abs</li>

<li><strong>Tuesday</strong> — Posterior Chain • Back • Biceps</li>

<li><strong>Wednesday / Thursday</strong> — Shoulders • Chest • Triceps • Abs</li>

<li><strong>Friday</strong> — Back • Biceps • Legs</li>

</ul>

</div>

<div class="card">

<h2>Weekly Volume</h2>

<p>

Chest 16 • Back 18 • Shoulders 12 •
Triceps 18 • Biceps 14 •
Posterior Chain 4 •
Quads 6 • Hamstrings 3 •
Abs 12

</p>

</div>

<nav class="bottom-nav">

<button class="active"
onclick="App.showHome()">

🏠<br>Home

</button>

<button
onclick="App.showWorkout()">

💪<br>Workout

</button>

<button
onclick="App.showProgress()">

📈<br>Progress

</button>

<button
onclick="App.showSettings()">

⚙<br>Settings

</button>

</nav>

`;

document.getElementById("app").innerHTML = html;

},

getTodayWorkout(){

const day = new Date().getDay();

switch(day){

case 0:
App.currentWorkout="sunday";
return "Sunday Workout";

case 2:
App.currentWorkout="tuesday";
return "Tuesday Workout";

case 3:
case 4:
App.currentWorkout="wednesday";
return "Wednesday / Thursday Workout";

case 5:
App.currentWorkout="friday";
return "Friday Workout";

default:
App.currentWorkout="sunday";
return "Next Workout";

}

}

};
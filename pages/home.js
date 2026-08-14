// ==========================================
// ⚒ FORGE50 v0.8
// Home Page
// ==========================================

const HomePage = {

    render() {
        const todayName = this.getTodayWorkout();
        const workout = appData.workouts[App.currentWorkout];
        const totalExercises = workout ? workout.exercises.length : 0;
        const history = WorkoutStorage.loadWorkoutHistory();
        const totalWorkouts = history.length;
        const streakData = ProgressPage ? ProgressPage.calculateStreak(history) : { current: 0 };

        const html = `

        <div class="card hero-card">
          <h1>⚒ FORGE50</h1>
          <p>Upper Body Hypertrophy Specialist</p>
          <p style="margin-top:8px;font-size:13px;color:var(--muted);">
            ${totalWorkouts > 0 ? totalWorkouts + ' workouts completed' : 'Ready to begin'}
            ${streakData.current > 1 ? ' · ' + streakData.current + ' day streak 🔥' : ''}
          </p>
        </div>

        <div class="card">
          <h2>Today's Workout</h2>
          <p style="font-size:24px;font-weight:700;color:var(--text);margin:8px 0;">
            ${todayName}
          </p>
          ${workout ? `<p style="font-size:14px;color:var(--muted);">${workout.focus.join(' · ')} · ${totalExercises} exercises</p>` : ''}
          <button class="primary-btn" onclick="App.showWorkout(App.currentWorkout)">
            Start Workout
          </button>
        </div>

        <div class="card">
          <h2>Weekly Split</h2>
          <ul class="split-list">
            <li><strong>Sunday</strong> — Upper A: Chest · Side Delts · Triceps · Abs</li>
            <li><strong>Tuesday</strong> — Upper Pull A: Back · Rear Delts · Biceps</li>
            <li><strong>Thursday</strong> — Upper B: Shoulders · Chest · Triceps · Abs</li>
            <li><strong>Friday</strong> — Upper Pull B: Back · Biceps · Legs</li>
          </ul>
        </div>

        <div class="card">
          <h2>Weekly Volume</h2>
          <div class="stats-grid" style="margin-top:8px;">
            ${Object.entries(appData.weeklyVolume).map(([muscle, sets]) => `
              <div class="stat-item" style="padding:10px;">
                <p class="stat-label">${muscle.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase())}</p>
                <p class="stat-value" style="font-size:20px;">${sets}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <nav class="bottom-nav" role="navigation" aria-label="Main navigation">
          <button class="active" aria-label="Home" aria-current="page">🏠<br>Home</button>
          <button onclick="App.showWorkout()" aria-label="Workout">💪<br>Workout</button>
          <button onclick="App.showProgress()" aria-label="Progress">📈<br>Progress</button>
          <button onclick="App.showSettings()" aria-label="Settings">⚙<br>Settings</button>
        </nav>
        `;

        document.getElementById("app").innerHTML = html;
    },

    getTodayWorkout() {
        const day = new Date().getDay();
        switch (day) {
            case 0:
                App.currentWorkout = "sunday";
                return "Sunday — Upper A (Chest Focus)";
            case 2:
                App.currentWorkout = "tuesday";
                return "Tuesday — Upper Pull A";
            case 4:
                App.currentWorkout = "thursday";
                return "Thursday — Upper B (Shoulder Focus)";
            case 5:
                App.currentWorkout = "friday";
                return "Friday — Upper Pull B + Lower";
            case 1:
                App.currentWorkout = "tuesday";
                return "Rest Day · Next: Tuesday — Upper Pull A";
            case 3:
                App.currentWorkout = "thursday";
                return "Rest Day · Next: Thursday — Upper B";
            default:
                App.currentWorkout = "sunday";
                return "Rest Day · Next: Sunday — Upper A";
        }
    }
};

// Export to window
window.HomePage = HomePage;

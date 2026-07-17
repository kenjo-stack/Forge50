// ==========================================
// ⚒ FORGE50 v0.5
// Workout Page with Progress Persistence
// ==========================================

const WorkoutPage = {
    
    currentDay: "sunday",
    
    /**
     * Load and render workout for specified day
     * Automatically restores completed exercises from localStorage
     * @param {string} day - Workout day (sunday, tuesday, wednesday, friday)
     */
    load(day = "sunday") {
        this.currentDay = day;
        
        // Check for new day and reset if needed
        const isNewDay = WorkoutStorage.checkNewDay();
        if (isNewDay) {
            console.log("New day detected - clearing previous workout");
            WorkoutStorage.clearWorkoutProgress(day);
        }
        
        // Load saved progress from localStorage
        const savedProgress = WorkoutStorage.loadWorkoutProgress(day);
        
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
        
        // Render exercise cards with saved completion status
        workout.exercises.forEach((exercise, index) => {
            const isCompleted = savedProgress.completed.includes(index);
            
            html += `
            
            <div class="card exercise-card ${isCompleted ? 'completed' : ''}">
            
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
            data-index="${index}"
            ${isCompleted ? 'checked' : ''}
            onchange="WorkoutPage.handleExerciseCheck('${day}', ${index}, this.checked)">
            
            Completed
            
            </label>
            
            </div>
            
            `;
        });
        
        // Add progress card
        html += `
        
        <div class="card progress-card">
        
        <h2>Workout Progress</h2>
        
        <div class="progress-bar">
        
        <div
        class="progress-fill"
        style="width:0%">
        
        </div>
        
        </div>
        
        <p id="progressText">
        
        0 / 0 Exercises (0%)
        
        </p>
        
        <div id="completeMessage" style="display:none; margin-top:16px; padding:16px; background:#25c26e; border-radius:12px; text-align:center; font-weight:700; font-size:18px;">
        
        🎉 Workout Complete!
        
        </div>
        
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
        
        // Update progress display
        this.updateWorkoutProgress(day);
    },
    
    /**
     * Handle exercise checkbox change
     * Saves completion status immediately to localStorage
     * @param {string} day - Workout day
     * @param {number} exerciseIndex - Index of exercise
     * @param {boolean} isChecked - Whether checkbox is checked
     */
    handleExerciseCheck(day, exerciseIndex, isChecked) {
        // Save to localStorage
        WorkoutStorage.saveExerciseCompletion(day, exerciseIndex, isChecked);
        
        // Update visual feedback
        const exerciseCard = document.querySelectorAll('.exercise-card')[exerciseIndex];
        if (exerciseCard) {
            if (isChecked) {
                exerciseCard.classList.add('completed');
            } else {
                exerciseCard.classList.remove('completed');
            }
        }
        
        // Update progress display
        this.updateWorkoutProgress(day);
    },
    
    /**
     * Update workout progress display
     * Shows completed exercises and percentage complete
     * Displays celebration message when workout is 100% complete
     * @param {string} day - Workout day
     */
    updateWorkoutProgress(day) {
        const workout = appData.workouts[day];
        const stats = WorkoutStorage.getProgressStats(day, workout.exercises.length);
        
        // Update progress bar
        const fill = document.querySelector(".progress-fill");
        if (fill) {
            fill.style.width = stats.percentage + "%";
        }
        
        // Update progress text
        const text = document.getElementById("progressText");
        if (text) {
            text.textContent = `${stats.completed} / ${stats.total} Exercises (${stats.percentage}%)`;
        }
        
        // Show completion message when all exercises are done
        const completeMessage = document.getElementById("completeMessage");
        if (completeMessage) {
            if (stats.isComplete) {
                completeMessage.style.display = "block";
                
                // Save to history on first completion
                if (stats.completed === stats.total && !this.historySavedToday) {
                    this.historySavedToday = true;
                    WorkoutStorage.saveWorkoutHistory(day, stats.total);
                    console.log("Workout completed and saved to history");
                }
            } else {
                completeMessage.style.display = "none";
                this.historySavedToday = false;
            }
        }
    },
    
    historySavedToday: false
};

// Keep backwards compatibility function
function updateWorkoutProgress() {
    WorkoutPage.updateWorkoutProgress(WorkoutPage.currentDay);
}

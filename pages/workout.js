// ==========================================
// ⚒ FORGE50 v0.5
// Workout Page with Exercise Logbook
// ==========================================

const WorkoutPage = {
    
    currentDay: "sunday",
    exerciseModal: null,
    currentExerciseModal: null,
    lastRestPeriod: null,
    
    /**
     * Load and render workout for specified day
     * @param {string} day - Workout day (sunday, tuesday, wednesday, friday)
     */
    load(day = "sunday") {
        this.currentDay = day;
        
        // Reset per-day flags when switching workout days
        this.historySavedToday = false;
        
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
        data-action="load-workout" data-day="sunday">
        
        Sunday
        
        </button>
        
        <button class="day-btn ${day==="tuesday"?"active":""}"
        data-action="load-workout" data-day="tuesday">
        
        Tuesday
        
        </button>
        
        <button class="day-btn ${day==="wednesday"?"active":""}"
        data-action="load-workout" data-day="wednesday">
        
        Wednesday / Thursday
        
        </button>
        
        <button class="day-btn ${day==="friday"?"active":""}"
        data-action="load-workout" data-day="friday">
        
        Friday
        
        </button>
        
        </div>
        
        </div>
        
        `;
        
        // Render exercise cards with logbook inputs
        workout.exercises.forEach((exercise, index) => {
            const isCompleted = savedProgress.completed.includes(index);
            const lastExercise = ExerciseLogbook.getLastExercise(day, exercise.name);
            const prStatus = ExerciseLogbook.checkNewPR({
                exercise: exercise.name,
                day: day,
                weight: lastExercise?.weight || 0,
                reps: lastExercise?.reps || 0
            });
            
            html += `
            
            <div class="card exercise-card ${isCompleted ? 'completed' : ''}">
            
            <div class="exercise-header">
            <h2 style="cursor:pointer; flex:1;" data-action="exercise-history" data-day="${day}" data-exercise="${exercise.name}" data-index="${index}">
            ${index+1}. ${exercise.name} 📊
            </h2>
            </div>
            
            <p>
            
            <strong>Sets:</strong> ${exercise.sets}<br>
            
            <strong>Reps:</strong> ${exercise.reps}<br>
            
            <strong>RIR:</strong> ${exercise.rir}<br>
            
            <strong>Rest:</strong> ${exercise.rest}
            
            </p>
            
            ${exercise.notes ? `<p class="small">${exercise.notes}</p>` : ""}
            
            ${lastExercise ? `
            <div class="last-workout-section">
            <p class="section-label">Last Workout</p>
            <div class="last-workout-info">
            <span>Weight: <strong>${lastExercise.weight} kg</strong></span>
            <span>Reps: <strong>${lastExercise.reps}</strong></span>
            <span>Date: <strong>${new Date(lastExercise.date).toLocaleDateString('en-GB', {day:'numeric', month:'short'})}</strong></span>
            </div>
            </div>
            ` : ""}
            
            <div class="exercise-inputs">
            
            <label class="input-group">
            <span>Weight (kg)</span>
            <input type="number" step="0.5" class="weight-input" placeholder="0" value="${lastExercise?.weight || ''}">
            </label>
            
            <label class="input-group">
            <span>Actual Reps</span>
            <input type="number" class="reps-input" placeholder="0" value="${lastExercise?.reps || ''}">
            </label>
            
            </div>
            
            <label class="input-group">
            <span>Notes</span>
            <textarea class="notes-input" placeholder="How did it feel?"></textarea>
            </label>
            
            <button class="primary-btn" data-action="complete-exercise" data-day="${day}" data-exercise="${exercise.name}" data-reps="${exercise.reps}" data-rir="${exercise.rir}" data-index="${index}" data-muscle="${exercise.muscle || 'Upper Body'}">✓ Complete Exercise</button>
            
            <label>
            
            <input
            type="checkbox"
            class="exercise-check"
            data-index="${index}"
            data-action="exercise-check" data-day="${day}" data-index="${index}"
            ${isCompleted ? 'checked' : ''}>
            
            Completed
            
            </label>
            
            </div>
            
            `;
        });
        
        // Add progress card
        html += `
        
        <div class="card progress-card">
        
        <h2>Workout Progress</h2>
        
        <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="Workout progress">
        
        <div
        class="progress-fill"
        style="width:0%">
        
        </div>
        
        </div>
        
        <p id="progressText" aria-live="polite">
        
        0 / 0 Exercises (0%)
        
        </p>
        
        <div id="completeMessage" style="display:none; margin-top:16px; padding:16px; background:#25c26e; border-radius:12px; text-align:center; font-weight:700; font-size:18px;">
        
        🎉 Workout Complete!
        
        </div>
        
        </div>
        
        <div class="card">
        
        <h2>Rest Timer</h2>
        
        <div class="timer-card">
        
        <div
        id="timerDisplay"
        class="timer-display">
        
        02:00
        
        </div>
        
        <div class="timer-buttons">
        
        <button
class="primary-btn"
data-action="start-rest">

⏱ Start Rest

</button>
        
        <button
        class="secondary-btn"
        data-action="pause-timer">
        
        ⏸ Pause
        
        </button>
        
        <button
        class="secondary-btn"
        data-action="reset-timer">
        
        ↺ Reset
        
        </button>
        
        </div>
        
        </div>
        
        <!-- Exercise History Modal -->
        <div id="exerciseModal" class="modal" role="dialog" aria-modal="true" aria-label="Exercise history">
        <div class="modal-content">
        <span class="modal-close" data-action="close-modal" aria-label="Close">&times;</span>
        <div id="modalBody"></div>
        <div class="timer-buttons">

<button class="primary-btn"
data-action="resume-timer">

▶ Resume

</button>

<button class="secondary-btn"
data-action="pause-timer">

⏸ Pause

</button>

<button class="secondary-btn"
data-action="reset-timer">

↺ Reset

</button>

<button class="secondary-btn"
data-action="skip-timer">

⏭ Skip

</button>

</div>
        
        
        </div>
        
        `;
        
        document.getElementById("app").innerHTML = html;
        this.updateWorkoutProgress(day);
        this._cacheDOMElements();
    },
    
    /**
     * Complete exercise and save to logbook
     * @param {string} day - Workout day
     * @param {string} exerciseName - Exercise name
     * @param {string} targetReps - Target rep range
     * @param {number} rir - Reps in reserve
     * @param {number} index - Exercise index
     * @param {string} muscle - Muscle group
     */
    completeExercise(day, exerciseName, targetReps, rir, index, muscle) {
        const weightInput = this._weightInputs ? this._weightInputs[index] : null;
        const repsInput = this._repsInputs ? this._repsInputs[index] : null;
        const notesInput = this._notesInputs ? this._notesInputs[index] : null;
        
        const weight = parseFloat(weightInput.value);
        const reps = parseInt(repsInput.value);
        const notes = notesInput.value;
        
        if (!weight || !reps) {
            showToast('Please enter weight and reps');
            return;
        }
        
        // Save to logbook
        const logEntry = {
            date: ExerciseLogbook.getTodayKey(),
            day: day,
            exercise: exerciseName,
            muscle: muscle,
            weight: weight,
            reps: reps,
            targetReps: targetReps,
            rir: rir,
            notes: notes,
            completed: true,
            timestamp: Math.floor(Date.now() / 1000)
        };
        
        ExerciseLogbook.saveExerciseLog(logEntry);
        
        // Check for PRs
        const prStatus = ExerciseLogbook.checkNewPR(logEntry);
        if (prStatus.isWeightPR || prStatus.isRepPR) {
            let prMessage = '🏆 New PR!';
            if (prStatus.isWeightPR) prMessage += ' • Weight PR!';
            if (prStatus.isRepPR) prMessage += ' • Rep PR!';
            showToast(prMessage);
        }
        
        // Mark as completed
        if (this._exerciseChecks && this._exerciseChecks[index]) {
            this._exerciseChecks[index].checked = true;
        }
        this.handleExerciseCheck(day, index, true);
        
        showToast('✅ Exercise saved!');
    },
    
    /**
     * Show exercise history modal
     * @param {string} day - Workout day
     * @param {string} exerciseName - Exercise name
     * @param {number} index - Exercise index
     */
    showExerciseModal(day, exerciseName, index) {
        const history = ExerciseLogbook.getExerciseHistory(day, exerciseName);
        const modal = document.getElementById('exerciseModal');
        const modalBody = document.getElementById('modalBody');
        
        let html = `<h3>${exerciseName}</h3><div class="exercise-history-list">`;
        
        if (history.length === 0) {
            html += '<p>No previous workouts for this exercise</p>';
        } else {
            history.forEach(log => {
                const dateObj = new Date(log.date);
                const dateStr = dateObj.toLocaleDateString('en-GB', {day:'numeric', month:'short'});
                html += `
                <div class="history-log-item">
                <p class="history-date">${dateStr}</p>
                <p class="history-performance">${log.weight} kg × ${log.reps}</p>
                ${log.notes ? `<p class="history-note">"${log.notes}"</p>` : ''}
                </div>
                `;
            });
        }
        
        html += '</div>';
        modalBody.innerHTML = html;
        modal.style.display = 'block';
        
        // Focus trap: move focus to modal and save trigger element
        WorkoutPage._lastFocusedElement = document.activeElement;
        const firstBtn = modal.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
        if (firstBtn) {
            setTimeout(() => firstBtn.focus(), 50);
        }
    },
    
    /**
     * Close exercise modal
     */
    closeExerciseModal() {
        const modal = document.getElementById('exerciseModal');
        if (modal) {
            modal.style.display = 'none';
            // Return focus to the element that triggered the modal
            if (WorkoutPage._lastFocusedElement) {
                WorkoutPage._lastFocusedElement.focus({ preventScroll: true });
                WorkoutPage._lastFocusedElement = null;
            }
        }
    },
    
    /**
     * Handle exercise checkbox change
     */
handleExerciseCheck(day, exerciseIndex, isChecked) {

    WorkoutStorage.saveExerciseCompletion(day, exerciseIndex, isChecked);

    const exerciseCard = this._exerciseCards ? this._exerciseCards[exerciseIndex] : null;

    // Get the current workout
    const workout = appData.workouts[day];

    if (exerciseCard) {

        if (isChecked) {

            exerciseCard.classList.add("completed");
            
            // Store this exercise's rest period for the manual Start Rest button
            this.lastRestPeriod = workout.exercises[exerciseIndex].rest;

            // Start timer using this exercise's rest period
            Timer.start(workout.exercises[exerciseIndex].rest);

        } else {

            exerciseCard.classList.remove("completed");

        }

    }

    this.updateWorkoutProgress(day);

},
    
    /**
     * Cache DOM element references for performance
     * Called after each render to avoid repeated querySelector calls
     */
    _cacheDOMElements() {
        this._progressFill = document.querySelector(".progress-fill");
        this._progressText = document.getElementById("progressText");
        this._completeMessage = document.getElementById("completeMessage");
        this._exerciseCards = document.querySelectorAll(".exercise-card");
        this._weightInputs = document.querySelectorAll(".weight-input");
        this._repsInputs = document.querySelectorAll(".reps-input");
        this._notesInputs = document.querySelectorAll(".notes-input");
        this._exerciseChecks = document.querySelectorAll(".exercise-check");
    },
    
    /**
     * Update workout progress display
     */
    updateWorkoutProgress(day) {
        const workout = appData.workouts[day];
        const stats = WorkoutStorage.getProgressStats(day, workout.exercises.length);
        
        if (this._progressFill) {
            this._progressFill.style.width = stats.percentage + "%";
        }
        
        const progressBar = document.querySelector(".progress-bar");
        if (progressBar) {
            progressBar.setAttribute("aria-valuenow", stats.percentage);
        }
        
        if (this._progressText) {
            this._progressText.textContent = `${stats.completed} / ${stats.total} Exercises (${stats.percentage}%)`;
        }
        
        if (this._completeMessage) {
            if (stats.isComplete) {
                this._completeMessage.style.display = "block";
                if (stats.completed === stats.total && !this.historySavedToday) {
                    this.historySavedToday = true;
                    WorkoutStorage.saveWorkoutHistory(day, stats.total);
                }
            } else {
                this._completeMessage.style.display = "none";
                this.historySavedToday = false;
            }
        }
    },
    
    historySavedToday: false,
    _lastFocusedElement: null
};

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('exerciseModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Tab trap for the exercise modal
document.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const modal = document.getElementById('exerciseModal');
    if (!modal || modal.style.display !== 'block') return;
    
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;
    
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
});
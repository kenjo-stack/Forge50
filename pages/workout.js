// ==========================================
// ⚒ FORGE50 v0.5
// Workout Page with Exercise Logbook
// ==========================================

const WorkoutPage = {
    
    currentDay: "sunday",
    exerciseModal: null,
    currentExerciseModal: null,
    
    /**
     * Load and render workout for specified day
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
            <h2 style="cursor:pointer; flex:1;" onclick="WorkoutPage.showExerciseModal('${day}', '${exercise.name}', ${index})">
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
            
            <button class="primary-btn" onclick="WorkoutPage.completeExercise('${day}', '${exercise.name}', '${exercise.reps}', '${exercise.rir}', ${index}, '${exercise.muscle || 'Upper Body'}')">✓ Complete Exercise</button>
            
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
        
        <!-- Exercise History Modal -->
        <div id="exerciseModal" class="modal">
        <div class="modal-content">
        <span class="modal-close" onclick="WorkoutPage.closeExerciseModal()">&times;</span>
        <div id="modalBody"></div>
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
        this.updateWorkoutProgress(day);
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
        const weightInput = document.querySelectorAll('.weight-input')[index];
        const repsInput = document.querySelectorAll('.reps-input')[index];
        const notesInput = document.querySelectorAll('.notes-input')[index];
        
        const weight = parseFloat(weightInput.value);
        const reps = parseInt(repsInput.value);
        const notes = notesInput.value;
        
        if (!weight || !reps) {
            alert('Please enter weight and reps');
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
            let prMessage = '🏆 New PR!\n';
            if (prStatus.isWeightPR) prMessage += '• Weight PR!';
            if (prStatus.isRepPR) prMessage += '\n• Rep PR!';
            alert(prMessage);
        }
        
        // Mark as completed
        const checkboxes = document.querySelectorAll('.exercise-check');
        checkboxes[index].checked = true;
        this.handleExerciseCheck(day, index, true);
        
        alert('✅ Exercise saved!');
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
    },
    
    /**
     * Close exercise modal
     */
    closeExerciseModal() {
        const modal = document.getElementById('exerciseModal');
        if (modal) modal.style.display = 'none';
    },
    
    /**
     * Handle exercise checkbox change
     */
    handleExerciseCheck(day, exerciseIndex, isChecked) {
        WorkoutStorage.saveExerciseCompletion(day, exerciseIndex, isChecked);
        const exerciseCard = document.querySelectorAll('.exercise-card')[exerciseIndex];
        if (exerciseCard) {
            if (isChecked) {
                exerciseCard.classList.add('completed');
            } else {
                exerciseCard.classList.remove('completed');
            }
        }
        this.updateWorkoutProgress(day);
    },
    
    /**
     * Update workout progress display
     */
    updateWorkoutProgress(day) {
        const workout = appData.workouts[day];
        const stats = WorkoutStorage.getProgressStats(day, workout.exercises.length);
        
        const fill = document.querySelector(".progress-fill");
        if (fill) {
            fill.style.width = stats.percentage + "%";
        }
        
        const text = document.getElementById("progressText");
        if (text) {
            text.textContent = `${stats.completed} / ${stats.total} Exercises (${stats.percentage}%)`;
        }
        
        const completeMessage = document.getElementById("completeMessage");
        if (completeMessage) {
            if (stats.isComplete) {
                completeMessage.style.display = "block";
                if (stats.completed === stats.total && !this.historySavedToday) {
                    this.historySavedToday = true;
                    WorkoutStorage.saveWorkoutHistory(day, stats.total);
                }
            } else {
                completeMessage.style.display = "none";
                this.historySavedToday = false;
            }
        }
    },
    
    historySavedToday: false
};

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('exerciseModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
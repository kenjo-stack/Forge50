// ==========================================
// ⚒ FORGE50 v0.8
// Workout Page with Exercise Logbook
// ==========================================

const WorkoutPage = {

    currentDay: "sunday",
    exerciseModal: null,
    currentExerciseModal: null,
    historySavedToday: false,

    /**
     * Show a non-blocking toast notification
     */
    showToast(message, type) {
        const existing = document.getElementById("forgeToast");
        if (existing) existing.remove();

        const toast = document.createElement("div");
        toast.id = "forgeToast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        toast.style.cssText = `
          position:fixed;bottom:100px;left:50%;transform:translateX(-50%);
          background:${type === 'pr' ? '#ff7a00' : type === 'success' ? '#25c26e' : '#1b2028'};
          color:#fff;padding:14px 24px;border-radius:14px;
          font-weight:600;font-size:15px;z-index:300;
          box-shadow:0 8px 32px rgba(0,0,0,0.5);
          animation:slideUp 0.3s ease;max-width:90%;text-align:center;
          border:1px solid rgba(255,255,255,0.08);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = 'opacity 0.3s ease';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    /**
     * Confetti burst for PR celebrations
     * Respects prefers-reduced-motion
     */
    confetti() {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const container = document.createElement('div');
        container.className = 'confetti-container';
        container.setAttribute('aria-hidden', 'true');
        const colors = ['#ff7a00', '#ffb347', '#25c26e', '#4da3ff', '#ff5e5e', '#c77dff'];
        for (let i = 0; i < 60; i++) {
            const p = document.createElement('div');
            p.className = 'confetti-piece';
            p.style.left = Math.random() * 100 + '%';
            p.style.background = colors[i % colors.length];
            p.style.width = (5 + Math.random() * 7) + 'px';
            p.style.height = (8 + Math.random() * 8) + 'px';
            p.style.animationDelay = (Math.random() * 0.4) + 's';
            p.style.animationDuration = (1.6 + Math.random() * 1.2) + 's';
            container.appendChild(p);
        }
        document.body.appendChild(container);
        setTimeout(() => container.remove(), 3200);
    },

    /**
     * Parse exercise rest string to seconds
     * @param {string} restStr - e.g. "2-3 min", "90 sec", "60 sec", "2 min"
     * @returns {number} Duration in seconds
     */
    parseRestToSeconds(restStr) {
        if (!restStr) return 120;
        const match = restStr.match(/(\d+)/);
        if (!match) return 120;
        const num = parseInt(match[1], 10);
        if (restStr.includes('min')) return num * 60;
        return num;
    },

    /**
     * Load and render workout for specified day
     */
    load(day) {
        this.currentDay = day;
        this.historySavedToday = false;

        const isNewDay = WorkoutStorage.checkNewDay();
        if (isNewDay) {
            WorkoutStorage.clearWorkoutProgress(day);
        }

        const savedProgress = WorkoutStorage.loadWorkoutProgress(day);
        const workout = appData.workouts[day];

        if (!workout) {
            document.getElementById("app").innerHTML = `
              <div class="card">
                <h1>Workout Not Found</h1>
                <p>No workout data for "${day}". Please try another day.</p>
                <button class="primary-btn" onclick="App.showHome()">Back Home</button>
              </div>
              <nav class="bottom-nav" role="navigation" aria-label="Main navigation">
                <button onclick="App.showHome()" aria-label="Home">🏠<br>Home</button>
                <button class="active" aria-label="Workout" aria-current="page">💪<br>Workout</button>
                <button onclick="App.showProgress()" aria-label="Progress">📈<br>Progress</button>
                <button onclick="App.showSettings()" aria-label="Settings">⚙<br>Settings</button>
              </nav>`;
            return;
        }

        let html = `
        <div class="card">
          <h1>${workout.title}</h1>
          <p>${workout.focus.join(" · ")}</p>
        </div>

        <div class="card search-card">
          <input type="text" id="exerciseSearch" class="search-input"
                 placeholder="🔍 Filter exercises..."
                 oninput="WorkoutPage.filterExercises(this.value)"
                 aria-label="Filter exercises by name">
        </div>

        <div class="card">
          <h2>Select Workout</h2>
          <div class="day-buttons" role="group" aria-label="Select workout day">
            <button class="day-btn ${day==="sunday" ? "active" : ""}" onclick="WorkoutPage.load('sunday')" aria-label="Sunday workout"${day==="sunday" ? ' aria-pressed="true"' : ''}>Sunday</button>
            <button class="day-btn ${day==="tuesday" ? "active" : ""}" onclick="WorkoutPage.load('tuesday')" aria-label="Tuesday workout"${day==="tuesday" ? ' aria-pressed="true"' : ''}>Tuesday</button>
            <button class="day-btn ${day==="thursday" ? "active" : ""}" onclick="WorkoutPage.load('thursday')" aria-label="Thursday workout"${day==="thursday" ? ' aria-pressed="true"' : ''}>Thursday</button>
            <button class="day-btn ${day==="friday" ? "active" : ""}" onclick="WorkoutPage.load('friday')" aria-label="Friday workout"${day==="friday" ? ' aria-pressed="true"' : ''}>Friday</button>
          </div>
        </div>
        `;

        // Render exercise cards
        workout.exercises.forEach((exercise, index) => {
            const isCompleted = savedProgress.completed.includes(index);
            const lastExercise = ExerciseLogbook.getLastExercise(day, exercise.name);
            const progression = ExerciseLogbook.getProgressionRecommendation(day, exercise.name, exercise.reps);
            const safeName = exercise.name.replace(/'/g, "\\'");
            const restSeconds = this.parseRestToSeconds(exercise.rest);

            html += `
            <div class="card exercise-card ${isCompleted ? 'completed' : ''}" data-ex-index="${index}" role="article" aria-label="Exercise ${index+1}: ${exercise.name}">

              <div class="exercise-header">
                <h2 onclick="WorkoutPage.showExerciseModal('${day}', '${safeName}', ${index})" role="button" tabindex="0" aria-label="View history for ${exercise.name}">
                  ${index+1}. ${exercise.name} <span style="font-size:14px;" aria-hidden="true">📊</span>
                </h2>
                <button class="guide-btn" onclick="event.stopPropagation(); ExerciseGuides.openByName(encodeURIComponent('${safeName}'))" aria-label="Open exercise guide for ${exercise.name}">📖 Guide</button>
              </div>

              <div class="exercise-meta" role="list" aria-label="Exercise details">
                <span role="listitem">${exercise.sets} sets</span>
                <span role="listitem">${exercise.reps} reps</span>
                <span role="listitem">RIR ${exercise.rir}</span>
                <span role="listitem">${exercise.rest} rest</span>
              </div>

              ${exercise.notes ? `<p class="small">${exercise.notes}</p>` : ""}

              ${lastExercise ? `
              <div class="last-workout-section" aria-label="Last workout data">
                <p class="section-label">Last Workout</p>
                <div class="last-workout-info">
                  <span>Weight: <strong>${lastExercise.weight} kg</strong></span>
                  <span>Reps: <strong>${lastExercise.reps}</strong></span>
                  <span>${new Date(lastExercise.date).toLocaleDateString('en-GB', {day:'numeric', month:'short'})}</span>
                </div>
              </div>` : ""}

              ${progression.hasData ? `
              <div class="progression-card ${progression.action === 'increase-weight' ? 'progression-up' : ''}" aria-label="Progressive overload recommendation">
                <div>
                  <span class="section-label">NEXT SESSION</span>
                  <strong>${progression.weight} kg × ${progression.reps} reps</strong>
                  <span class="progression-reason">${progression.reason}</span>
                </div>
                <button class="secondary-btn progression-use-btn" onclick="WorkoutPage.useProgression(${index}, ${progression.weight}, ${progression.reps})" aria-label="Use suggested ${progression.weight} kilograms and ${progression.reps} reps">Use</button>
              </div>` : `
              <div class="progression-card" aria-label="Progressive overload guidance">
                <div><span class="section-label">PROGRESSION</span><span class="progression-reason">${progression.reason}</span></div>
              </div>`}

              <div class="exercise-inputs" role="group" aria-label="Exercise input fields">
                <label class="input-group">
                  <span>Weight (kg)</span>
                  <input type="number" step="0.5" min="0" max="500" class="weight-input" placeholder="0" value="${lastExercise?.weight || ''}" inputmode="decimal" aria-label="Weight in kilograms">
                </label>
                <label class="input-group">
                  <span>Actual Reps</span>
                  <input type="number" min="0" max="100" class="reps-input" placeholder="0" value="${lastExercise?.reps || ''}" inputmode="numeric" aria-label="Actual reps performed">
                </label>
              </div>

              <label class="input-group" style="margin-top:12px;">
                <span>Notes</span>
                <textarea class="notes-input" placeholder="How did it feel?" rows="2" aria-label="Exercise notes"></textarea>
              </label>

              <div class="exercise-action-row" style="margin-top:16px;">
                <button class="primary-btn" onclick="WorkoutPage.completeExercise('${day}', '${safeName}', '${exercise.reps}', ${exercise.rir}, ${index}, '${exercise.muscle || 'Upper Body'}')" aria-label="Complete ${exercise.name}">
                  ✓ Complete Exercise
                </button>
                <button class="secondary-btn rest-start-btn" onclick="Timer.start(${restSeconds}, 'Rest: ${exercise.rest.replace(/'/g, "\\'")}')" aria-label="Start ${exercise.rest} rest for ${exercise.name}">
                  ⏱ Start Rest · ${Timer.format(restSeconds)}
                </button>
              </div>

              <label>
                <input type="checkbox" class="exercise-check" data-index="${index}" ${isCompleted ? 'checked' : ''} onchange="WorkoutPage.handleExerciseCheck('${day}', ${index}, this.checked)" aria-label="Mark ${exercise.name} as completed">
                Completed
              </label>

            </div>`;
        });

        // Progress + Timer
        html += `
        <div class="card progress-card" aria-label="Workout progress">
          <h2>Workout Progress</h2>
          <div class="progress-bar" role="progressbar" aria-label="Workout completion" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-fill" style="width:0%"></div>
          </div>
          <p id="progressText" aria-live="polite">0 / 0 Exercises (0%)</p>
          <div id="completeMessage" style="display:none;" role="alert">🎉 Workout Complete!</div>
        </div>

        <div class="card rest-timer-card" aria-label="Rest timer">
          <div class="rest-timer-heading">
            <div>
              <h2>Rest Timer</h2>
              <p id="timerLabel" class="small">Rest Timer</p>
            </div>
            <span class="timer-status" aria-hidden="true">●</span>
          </div>
          <div id="timerDisplay" class="timer-display" aria-live="polite" aria-label="Timer display">02:00</div>
          <div class="timer-adjust-row" role="group" aria-label="Adjust rest time">
            <button class="secondary-btn" onclick="Timer.add(-15)" aria-label="Subtract 15 seconds">−15 sec</button>
            <button class="secondary-btn" onclick="Timer.add(15)" aria-label="Add 15 seconds">+15 sec</button>
          </div>
          <div class="timer-buttons" role="group" aria-label="Timer controls">
            <button id="timerStartBtn" class="primary-btn" onclick="Timer.resume()" aria-label="Start or resume timer">▶ Start Rest</button>
            <button id="timerPauseBtn" class="secondary-btn" onclick="Timer.pause()" aria-label="Pause timer">⏸ Pause</button>
            <button class="secondary-btn" onclick="Timer.reset()" aria-label="Reset timer">↺ Reset</button>
            <button class="secondary-btn danger" onclick="Timer.skip()" aria-label="Skip rest timer">⏭ Skip</button>
          </div>
          <p class="timer-help">Rest is automatically selected from the exercise prescription. The timer keeps its time when you switch pages or the phone screen is locked.</p>
        </div>

        <!-- Exercise History Modal -->
        <div id="exerciseModal" class="modal" role="dialog" aria-modal="true" aria-label="Exercise history">
          <div class="modal-content" onclick="event.stopPropagation()">
            <span class="modal-close" onclick="WorkoutPage.closeExerciseModal()" role="button" tabindex="0" aria-label="Close modal">&times;</span>
            <div id="modalBody"></div>
          </div>
        </div>

        <nav class="bottom-nav" role="navigation" aria-label="Main navigation">
          <button onclick="App.showHome()" aria-label="Home">🏠<br>Home</button>
          <button class="active" aria-label="Workout" aria-current="page">💪<br>Workout</button>
          <button onclick="App.showProgress()" aria-label="Progress">📈<br>Progress</button>
          <button onclick="App.showSettings()" aria-label="Settings">⚙<br>Settings</button>
        </nav>`;

        document.getElementById("app").innerHTML = html;
        this.updateWorkoutProgress(day);
        if (typeof Timer !== "undefined") Timer.update();
    },

    /**
     * Complete exercise and save to logbook
     */
    completeExercise(day, exerciseName, targetReps, rir, index, muscle) {
        const weightInput = document.querySelectorAll('.weight-input');
        const repsInput = document.querySelectorAll('.reps-input');
        const notesInput = document.querySelectorAll('.notes-input');

        if (!weightInput[index] || !repsInput[index]) return;

        const weight = parseFloat(weightInput[index].value);
        const reps = parseInt(repsInput[index].value);
        const notes = notesInput[index] ? notesInput[index].value : '';

        if (!weight || !reps) {
            this.showToast('Please enter weight and reps', 'warning');
            return;
        }

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
        const isPR = prStatus.isWeightPR || prStatus.isRepPR;

        if (isPR) {
            let msg = '🏆 New PR!';
            if (prStatus.isWeightPR && prStatus.isRepPR) {
                msg = `🏆 New PR! ${weight} kg × ${reps} reps`;
            } else if (prStatus.isWeightPR) {
                msg = `🏆 Weight PR! ${weight} kg on ${exerciseName}`;
            } else if (prStatus.isRepPR) {
                msg = `🏆 Rep PR! ${reps} reps at ${weight} kg`;
            }
            this.showToast(msg, 'pr');
            this.confetti();
        } else {
            this.showToast('✅ Exercise saved!', 'success');
        }

        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(isPR ? [50, 100, 50] : 50);
        }

        // Mark as completed
        const checkboxes = document.querySelectorAll('.exercise-check');
        if (checkboxes[index]) {
            checkboxes[index].checked = true;
        }
        this.handleExerciseCheck(day, index, true);

        // Prepare the prescribed rest without starting it unexpectedly.
        // The exercise card also has a dedicated Start Rest button.
        const exercise = appData.workouts[day]?.exercises?.[index];
        if (exercise && exercise.rest && typeof Timer !== "undefined") {
            const restSeconds = this.parseRestToSeconds(exercise.rest);
            if (restSeconds > 0 && !Timer.interval) {
                Timer.setDuration(restSeconds, `Rest: ${exercise.rest}`);
            }
        }
    },

    /**
     * Apply the recommended progressive-overload target to an exercise.
     */
    useProgression(index, weight, reps) {
        const weights = document.querySelectorAll('.weight-input');
        const repsInputs = document.querySelectorAll('.reps-input');
        if (!weights[index] || !repsInputs[index]) return;
        weights[index].value = weight;
        repsInputs[index].value = reps;
        weights[index].focus();
        this.showToast(`🎯 Target set: ${weight} kg × ${reps} reps`, 'success');
    },

    /**
     * Filter exercise cards by name
     * @param {string} query
     */
    filterExercises(query) {
        const q = query.trim().toLowerCase();
        const cards = document.querySelectorAll('.exercise-card');
        let visible = 0;
        cards.forEach(card => {
            const name = card.querySelector('h2')?.textContent.toLowerCase() || '';
            const show = !q || name.includes(q);
            card.style.display = show ? '' : 'none';
            if (show) visible++;
        });
        // Show/hide progress + timer cards when filtering
        const progressCard = document.querySelector('.progress-card');
        if (progressCard) progressCard.style.display = q ? 'none' : '';
    },

    /**
     * Show exercise history modal
     */
    showExerciseModal(day, exerciseName, index) {
        const history = ExerciseLogbook.getExerciseHistory(day, exerciseName);
        const modal = document.getElementById('exerciseModal');
        const modalBody = document.getElementById('modalBody');

        if (!modal || !modalBody) return;

        let html = `<h3>${exerciseName}</h3><div class="exercise-history-list" role="list" aria-label="Exercise history">`;

        if (history.length === 0) {
            html += '<p>No previous workouts for this exercise</p>';
        } else {
            history.forEach(log => {
                const dateStr = new Date(log.date).toLocaleDateString('en-GB', {day:'numeric', month:'short'});
                html += `
                <div class="history-log-item" role="listitem">
                  <span class="history-date">${dateStr}</span>
                  <span class="history-performance">${log.weight} kg × ${log.reps}</span>
                  ${log.notes ? `<span class="history-note">"${log.notes}"</span>` : ''}
                </div>`;
            });
        }

        html += '</div>';
        modalBody.innerHTML = html;
        modal.style.display = 'block';
        modal.focus();
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
        const cards = document.querySelectorAll('.exercise-card');
        if (cards[exerciseIndex]) {
            if (isChecked) {
                cards[exerciseIndex].classList.add('completed');
            } else {
                cards[exerciseIndex].classList.remove('completed');
            }
        }
        this.updateWorkoutProgress(day);
    },

    /**
     * Update workout progress display
     */
    updateWorkoutProgress(day) {
        const workout = appData.workouts[day];
        if (!workout) return;

        const stats = WorkoutStorage.getProgressStats(day, workout.exercises.length);

        const fill = document.querySelector(".progress-fill");
        if (fill) {
            fill.style.width = stats.percentage + "%";
        }

        const progressBar = document.querySelector(".progress-bar");
        if (progressBar) {
            progressBar.setAttribute("aria-valuenow", stats.percentage);
        }

        const text = document.getElementById("progressText");
        if (text) {
            text.textContent = `${stats.completed} / ${stats.total} Exercises (${stats.percentage}%)`;
        }

        const completeMessage = document.getElementById("completeMessage");
        if (completeMessage) {
            if (stats.isComplete) {
                completeMessage.style.display = "block";
                if (!this.historySavedToday) {
                    this.historySavedToday = true;
                    WorkoutStorage.saveWorkoutHistory(day, stats.total);
                    this.showToast('🎉 Workout Complete! Saved to history.', 'success');
                }
            } else {
                completeMessage.style.display = "none";
                this.historySavedToday = false;
            }
        }
    }
};

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('exerciseModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Keyboard: close modal on Escape
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const modal = document.getElementById('exerciseModal');
        if (modal && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    }
});

// Export to window
window.WorkoutPage = WorkoutPage;

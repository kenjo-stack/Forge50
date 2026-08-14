// ==========================================
// ⚒ FORGE50 v0.8
// Progress & History Page
// ==========================================

/**
 * Progress page displays workout history, statistics, volume chart,
 * personal records, and streak tracking.
 */
const ProgressPage = {

    /**
     * Render progress page with all stats
     */
    render() {
        const history = WorkoutStorage.loadWorkoutHistory();
        const stats = this.calculateStats(history);
        const logbook = ExerciseLogbook.loadAllLogs();
        const records = ExerciseLogbook.getAllPersonalRecords();
        const totalVolume = ExerciseLogbook.getTotalVolume();
        const streakData = this.calculateStreak(history);

        let html = `
        <div class="card hero-card">
          <h1>📈 Progress</h1>
          <p>Your Workout History &amp; Statistics</p>
        </div>

        <div class="card">
          <h2>Overall Statistics</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <p class="stat-label">Workouts</p>
              <p class="stat-value">${stats.totalWorkouts}</p>
            </div>
            <div class="stat-item">
              <p class="stat-label">Exercises</p>
              <p class="stat-value">${stats.totalExercises}</p>
            </div>
            <div class="stat-item">
              <p class="stat-label">Avg Completion</p>
              <p class="stat-value">${stats.averageCompletion}%</p>
            </div>
            <div class="stat-item">
              <p class="stat-label">Total Minutes</p>
              <p class="stat-value">${stats.totalMinutes}</p>
            </div>
            <div class="stat-item">
              <p class="stat-label">Volume Lifted</p>
              <p class="stat-value">${this.formatVolume(totalVolume)}</p>
            </div>
            <div class="stat-item">
              <p class="stat-label">Current Streak</p>
              <p class="stat-value" style="color:${streakData.current > 0 ? 'var(--success)' : 'var(--muted)'}">
                ${streakData.current} days
              </p>
            </div>
          </div>
        </div>
        `;

        // ── Workout Calendar ──
        html += this.renderCalendar(history);

        // ── Personal Records ──
        if (records.length > 0) {
            html += `
            <div class="card">
              <h2>🏆 Personal Records</h2>
            `;
            // Show top 8 most recent PRs
            records.slice(-8).reverse().forEach(pr => {
                html += `
                <div class="history-item" style="border-left-color:var(--accent);">
                  <div class="history-header">
                    <div>
                      <p class="history-workout">${pr.exercise}</p>
                      <p class="history-date">${this.formatWorkoutName(pr.day)}</p>
                    </div>
                    <div class="history-stats">
                      <p class="history-percentage" style="font-size:16px;">${pr.weightPR} kg</p>
                      <p class="history-exercises">Weight PR</p>
                    </div>
                  </div>
                  <p class="history-duration">🏅 ${new Date(pr.weightDate).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</p>
                </div>
                `;
            });
            html += `</div>`;
        }

        // ── Volume Chart ──
        const volumeData = this.computeVolumeHistory(logbook);
        if (volumeData.labels.length > 1) {
            html += `
            <div class="card">
              <h2>📊 Volume Over Time</h2>
              <div style="position:relative;width:100%;height:180px;margin-top:12px;">
                <canvas id="volumeChart" width="600" height="360"></canvas>
              </div>
            </div>
            `;
        }

        // ── Recent Workouts ──
        if (history.length > 0) {
            html += `
            <div class="card">
              <h2>Recent Workouts</h2>
            `;

            const recent = history.slice(-10).reverse();
            recent.forEach(entry => {
                const date = new Date(entry.timestamp);
                const dateStr = date.toLocaleDateString('en-GB', { day:'numeric', month:'short' });
                const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                html += `
                <div class="history-item">
                  <div class="history-header">
                    <div>
                      <p class="history-workout"><strong>${this.formatWorkoutName(entry.workout)}</strong></p>
                      <p class="history-date">${dateStr} at ${timeStr}</p>
                    </div>
                    <div class="history-stats">
                      <p class="history-percentage">${entry.percentage}%</p>
                      <p class="history-exercises">${entry.completedExercises}/${entry.totalExercises}</p>
                    </div>
                  </div>
                  <div class="progress-bar" style="height:6px;margin-top:8px;">
                    <div class="progress-fill" style="width:${entry.percentage}%;height:100%;"></div>
                  </div>
                  <p class="history-duration">⏱ ${entry.duration} minutes</p>
                </div>
                `;
            });

            html += `</div>`;
        } else {
            html += `
            <div class="card">
              <h2>No Workouts Yet</h2>
              <p>Start working out to see your progress history here!</p>
              <button class="primary-btn" onclick="App.showWorkout()">Start First Workout</button>
            </div>
            `;
        }

        // ── Navigation ──
        html += `
        <nav class="bottom-nav" role="navigation" aria-label="Main navigation">
          <button onclick="App.showHome()" aria-label="Home">🏠<br>Home</button>
          <button onclick="App.showWorkout()" aria-label="Workout">💪<br>Workout</button>
          <button class="active" aria-label="Progress" aria-current="page">📈<br>Progress</button>
          <button onclick="App.showSettings()" aria-label="Settings">⚙<br>Settings</button>
        </nav>
        `;

        document.getElementById("app").innerHTML = html;

        // Draw chart after DOM renders
        if (volumeData.labels.length > 1) {
            this.drawVolumeChart(volumeData);
        }
    },

    /**
     * Render a monthly workout calendar
     * @param {array} history - Workout history entries
     * @returns {string} HTML for calendar card
     */
    renderCalendar(history) {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const monthNames = ['January','February','March','April','May','June',
                            'July','August','September','October','November','December'];

        // Build set of dates with workouts
        const workoutDates = new Set();
        history.forEach(e => {
            const d = e.date || (e.timestamp ? new Date(e.timestamp).toISOString().split('T')[0] : '');
            if (d) workoutDates.add(d);
        });

        const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const todayKey = now.toISOString().split('T')[0];

        let cells = '';
        // Empty cells before 1st
        for (let i = 0; i < firstDay; i++) {
            cells += '<div class="cal-cell cal-empty"></div>';
        }
        for (let d = 1; d <= daysInMonth; d++) {
            const key = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            const hasWorkout = workoutDates.has(key);
            const isToday = key === todayKey;
            let cls = 'cal-cell';
            if (hasWorkout) cls += ' cal-done';
            if (isToday) cls += ' cal-today';
            cells += `<div class="${cls}">${d}</div>`;
        }

        const dayHeaders = ['S','M','T','W','T','F','S'].map(d =>
            `<div class="cal-header">${d}</div>`).join('');

        return `
        <div class="card">
          <h2>📅 ${monthNames[month]} ${year}</h2>
          <div class="calendar-grid">
            ${dayHeaders}
            ${cells}
          </div>
          <div class="cal-legend">
            <span class="cal-dot-done"></span> Workout completed
            <span class="cal-dot-today"></span> Today
          </div>
        </div>`;
    },

    /**
     * Compute volume-per-session from logbook data
     */
    computeVolumeHistory(logbook) {
        const sessionsByDate = {};
        Object.values(logbook).forEach(logs => {
            logs.forEach(log => {
                const d = log.date || (log.timestamp ? new Date(log.timestamp * 1000).toISOString().split('T')[0] : '');
                if (!d) return;
                const vol = (log.weight || 0) * (log.reps || 0);
                sessionsByDate[d] = (sessionsByDate[d] || 0) + vol;
            });
        });

        const dates = Object.keys(sessionsByDate).sort();
        return {
            labels: dates,
            values: dates.map(d => sessionsByDate[d])
        };
    },

    /**
     * Draw a lightweight volume-over-time chart on canvas
     */
    drawVolumeChart(data) {
        const canvas = document.getElementById('volumeChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        const w = rect.width || 300;
        const h = 180;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.scale(dpr, dpr);

        const vals = data.values;
        const maxVal = Math.max(...vals, 1);
        const pad = { top: 20, bottom: 24, left: 0, right: 0 };
        const chartW = w - pad.left - pad.right;
        const chartH = h - pad.top - pad.bottom;
        const barW = Math.min(Math.floor(chartW / vals.length * 0.6), 24);

        // Background
        ctx.clearRect(0, 0, w, h);

        // Grid lines
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = pad.top + (chartH / 4) * i;
            ctx.beginPath();
            ctx.moveTo(pad.left, y);
            ctx.lineTo(w - pad.right, y);
            ctx.stroke();
        }

        // Bars
        const gap = (chartW - barW * vals.length) / (vals.length + 1);
        vals.forEach((v, i) => {
            const x = pad.left + gap + i * (barW + gap);
            const barH = (v / maxVal) * chartH;
            const y = pad.top + chartH - barH;

            // Gradient bar
            const grad = ctx.createLinearGradient(x, y, x, pad.top + chartH);
            grad.addColorStop(0, '#ff7a00');
            grad.addColorStop(1, '#ffb347');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
            ctx.fill();
        });

        // X-axis labels (show every Nth label to avoid crowding)
        const labelStep = Math.max(1, Math.floor(vals.length / 6));
        data.labels.forEach((d, i) => {
            if (i % labelStep !== 0 && i !== vals.length - 1) return;
            const x = pad.left + gap + i * (barW + gap) + barW / 2;
            ctx.fillStyle = '#9aa4b5';
            ctx.font = '10px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
            ctx.textAlign = 'center';
            const short = d.slice(5); // MM-DD
            ctx.fillText(short, x, h - 4);
        });
    },

    /**
     * Calculate streak (consecutive workout days)
     */
    calculateStreak(history) {
        if (history.length === 0) return { current: 0, longest: 0 };

        const dates = [...new Set(history.map(e => e.date || e.timestamp.split('T')[0]))].sort().reverse();

        let current = 0;
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        const yesterdayStr = new Date(today.getTime() - 86400000).toISOString().split('T')[0];

        // Start from today or yesterday
        const startIdx = dates[0] === todayStr || dates[0] === yesterdayStr ? 0 : -1;

        if (startIdx === 0) {
            current = 1;
            for (let i = 1; i < dates.length; i++) {
                const prev = new Date(dates[i - 1]);
                const curr = new Date(dates[i]);
                const diffDays = (prev.getTime() - curr.getTime()) / 86400000;
                if (Math.round(diffDays) === 1) {
                    current++;
                } else {
                    break;
                }
            }
        }

        // Longest streak
        let longest = 0;
        let streak = 1;
        const sorted = [...dates].sort();
        for (let i = 1; i < sorted.length; i++) {
            const diff = (new Date(sorted[i]) - new Date(sorted[i - 1])) / 86400000;
            if (Math.round(diff) === 1) {
                streak++;
                longest = Math.max(longest, streak);
            } else {
                streak = 1;
            }
        }
        longest = Math.max(longest, streak, current);

        return { current, longest };
    },

    /**
     * Calculate overall statistics from history
     * @param {array} history
     * @returns {object}
     */
    calculateStats(history) {
        if (history.length === 0) {
            return { totalWorkouts: 0, totalExercises: 0, averageCompletion: 0, totalMinutes: 0 };
        }

        const totalWorkouts = history.length;
        const totalExercises = history.reduce((sum, e) => sum + e.completedExercises, 0);
        const totalPercentage = history.reduce((sum, e) => sum + e.percentage, 0);
        const averageCompletion = Math.round(totalPercentage / history.length);
        const totalMinutes = history.reduce((sum, e) => sum + (e.duration || 0), 0);

        return { totalWorkouts, totalExercises, averageCompletion, totalMinutes };
    },

    /**
     * Format volume for display
     */
    formatVolume(kg) {
        if (kg >= 1000) return (kg / 1000).toFixed(1) + 't';
        if (kg >= 0) return Math.round(kg) + ' kg';
        return '0 kg';
    },

    /**
     * Format workout day name for display
     * @param {string} day
     * @returns {string}
     */
    formatWorkoutName(day) {
        const names = {
            'sunday': 'Sunday',
            'tuesday': 'Tuesday',
            'thursday': 'Thursday',
            'wednesday': 'Thursday',  // legacy history entries
            'friday': 'Friday'
        };
        return names[day] || day;
    }
};

// Export to window
window.ProgressPage = ProgressPage;

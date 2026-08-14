// ==========================================
// ⚒ FORGE50 v0.8
// Settings Page
// ==========================================

/**
 * Settings page for app configuration and data management
 */
const SettingsPage = {

    render() {
        const history = WorkoutStorage.loadWorkoutHistory();
        const allProgress = WorkoutStorage.loadAllProgress();
        const logbookData = ExerciseLogbook.loadAllLogs();
        const totalLogs = Object.values(logbookData).reduce((sum, logs) => sum + logs.length, 0);
        const totalPRs = ExerciseLogbook.getAllPersonalRecords().length;

        let html = `
        <div class="card hero-card">
          <h1>⚙ Settings</h1>
          <p>App Configuration &amp; Data Management</p>
        </div>

        <div class="card">
          <h2>Profile</h2>
          <p><strong>Name:</strong> ${appData.profile.name}</p>
          <p><strong>Age:</strong> ${appData.profile.age}</p>
          <p><strong>Height:</strong> ${appData.profile.height} cm</p>
          <p><strong>Weight:</strong> ${appData.profile.weight} kg</p>
          <p><strong>Goal:</strong> ${appData.profile.goal}</p>
        </div>

        <div class="card">
          <h2>Data Summary</h2>
          <div class="stats-grid" style="margin-top:8px;">
            <div class="stat-item" style="padding:10px;">
              <p class="stat-label">Workout History</p>
              <p class="stat-value" style="font-size:22px;">${history.length}</p>
            </div>
            <div class="stat-item" style="padding:10px;">
              <p class="stat-label">Exercise Logs</p>
              <p class="stat-value" style="font-size:22px;">${totalLogs}</p>
            </div>
            <div class="stat-item" style="padding:10px;">
              <p class="stat-label">Personal Records</p>
              <p class="stat-value" style="font-size:22px;">${totalPRs}</p>
            </div>
            <div class="stat-item" style="padding:10px;">
              <p class="stat-label">Storage Used</p>
              <p class="stat-value" style="font-size:22px;" id="storageSize">—</p>
            </div>
          </div>
        </div>

        <div class="card">
          <h2>Data Management</h2>
          <button class="secondary-btn" onclick="SettingsPage.exportData()" style="margin-top:8px;">
            📥 Export All Data
          </button>
          <button class="secondary-btn" onclick="SettingsPage.exportLogbook()">
            📤 Export Exercise Logs
          </button>
          <button class="secondary-btn danger" onclick="SettingsPage.clearHistory()">
            🗑 Clear Workout History
          </button>
          <button class="secondary-btn danger" onclick="SettingsPage.clearLogbook()">
            🗑 Clear Exercise Logs &amp; PRs
          </button>
        </div>

        <div class="card">
          <h2>About FORGE50</h2>
          <p><strong>Version:</strong> 1.5</p>
          <p><strong>Type:</strong> Progressive Web App (PWA)</p>
          <p><strong>Storage:</strong> Browser localStorage (no server)</p>
          <p><strong>Built with:</strong> HTML5, CSS3, JavaScript ES6</p>
          <p style="margin-top:16px;color:var(--success);font-weight:500;">
            ✓ Your data stays on your device. All workouts are saved locally.
          </p>
        </div>

        <nav class="bottom-nav" role="navigation" aria-label="Main navigation">
          <button onclick="App.showHome()" aria-label="Home">🏠<br>Home</button>
          <button onclick="App.showWorkout()" aria-label="Workout">💪<br>Workout</button>
          <button onclick="App.showProgress()" aria-label="Progress">📈<br>Progress</button>
          <button class="active" aria-label="Settings" aria-current="page">⚙<br>Settings</button>
        </nav>
        `;

        document.getElementById("app").innerHTML = html;
        this.updateStorageSize();
    },

    updateStorageSize() {
        let totalSize = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("forge50-")) {
                totalSize += localStorage.getItem(key).length;
            }
        }
        const el = document.getElementById("storageSize");
        if (el) {
            el.textContent = (totalSize / 1024).toFixed(1) + ' KB';
        }
    },

    /**
     * Export all workout data as JSON download
     */
    exportData() {
        const history = WorkoutStorage.loadWorkoutHistory();
        const progress = WorkoutStorage.loadAllProgress();
        const logbook = ExerciseLogbook.loadAllLogs();
        const records = ExerciseLogbook.loadPersonalRecords();

        const data = {
            exportDate: new Date().toISOString(),
            appVersion: "0.8",
            profile: appData.profile,
            history: history,
            currentProgress: progress,
            exerciseLogs: logbook,
            personalRecords: records
        };

        this.downloadJSON(data, `forge50-full-export-${new Date().toISOString().split('T')[0]}.json`);
    },

    /**
     * Export just the exercise logbook as JSON
     */
    exportLogbook() {
        const logbook = ExerciseLogbook.loadAllLogs();
        const records = ExerciseLogbook.loadPersonalRecords();
        const data = {
            exportDate: new Date().toISOString(),
            exerciseLogs: logbook,
            personalRecords: records
        };
        this.downloadJSON(data, `forge50-logs-${new Date().toISOString().split('T')[0]}.json`);
    },

    /**
     * Helper to download JSON file
     */
    downloadJSON(obj, filename) {
        const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },

    /**
     * Clear workout history with confirmation
     */
    clearHistory() {
        if (!confirm('⚠️ Clear all workout history?\n\nThis deletes completed workout records. Your exercise logs (weights, reps, PRs) are preserved.')) return;
        if (!confirm('This is permanent. Clear history?')) return;

        localStorage.removeItem(WorkoutStorage.HISTORY_KEY);
        // Keep progress and logbook
        this.render();
    },

    /**
     * Clear exercise logs and PRs with confirmation
     */
    clearLogbook() {
        if (!confirm('⚠️ Clear all exercise logs and personal records?\n\nThis deletes every weight, rep, and PR you\'ve recorded. Workout history (dates, percentages) is preserved.')) return;
        if (!confirm('This is permanent. Clear all exercise data?')) return;

        ExerciseLogbook.clearAll();
        this.render();
    }
};

// Export to window
window.SettingsPage = SettingsPage;

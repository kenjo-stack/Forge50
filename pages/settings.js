// ==========================================
// ⚒ FORGE50 v0.5
// Settings Page
// ==========================================

/**
 * Settings page for app configuration and data management
 */
const SettingsPage = {
    
    /**
     * Render settings page
     */
    render() {
        let html = `
        
        <div class="card hero-card">
        
        <h1>⚙ Settings</h1>
        
        <p>App Configuration & Data Management</p>
        
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
        
        <h2>Data Management</h2>
        
        <p>Current Progress Storage: <strong id="storageSize">Calculating...</strong></p>
        
        <button class="secondary-btn" onclick="SettingsPage.exportData()" style="margin-top: 12px;">
        📥 Export History
        </button>
        
        <button class="secondary-btn" onclick="SettingsPage.clearHistory()" style="margin-top: 12px; background: #c73e1d;">
        🗑 Clear History
        </button>
        
        </div>
        
        <div class="card">
        
        <h2>About FORGE50</h2>
        
        <p><strong>Version:</strong> 0.5</p>
        <p><strong>Type:</strong> Progressive Web App (PWA)</p>
        <p><strong>Storage:</strong> Browser localStorage (no server)</p>
        <p><strong>Built with:</strong> HTML5, CSS3, JavaScript ES6</p>
        
        <p style="margin-top: 16px; color: #25c26e;">
        Your data stays on your device. All workouts are saved locally.
        </p>
        
        </div>
        
        <nav class="bottom-nav">
        
        <button onclick="App.showHome()">
        
        🏠<br>Home
        
        </button>
        
        <button onclick="App.showWorkout()">
        
        💪<br>Workout
        
        </button>
        
        <button onclick="App.showProgress()">
        
        📈<br>Progress
        
        </button>
        
        <button class="active">
        
        ⚙<br>Settings
        
        </button>
        
        </nav>
        
        `;
        
        document.getElementById("app").innerHTML = html;
        this.updateStorageSize();
    },
    
    /**
     * Calculate and display storage size
     */
    updateStorageSize() {
        const progressData = localStorage.getItem(WorkoutStorage.PROGRESS_KEY) || '';
        const historyData = localStorage.getItem(WorkoutStorage.HISTORY_KEY) || '';
        
        const totalSize = progressData.length + historyData.length;
        const sizeKB = (totalSize / 1024).toFixed(2);
        
        const sizeElement = document.getElementById("storageSize");
        if (sizeElement) {
            sizeElement.textContent = `${sizeKB} KB`;
        }
    },
    
    /**
     * Export workout history as JSON
     */
    exportData() {
        const history = WorkoutStorage.loadWorkoutHistory();
        const progress = WorkoutStorage.loadAllProgress();
        
        const data = {
            exportDate: new Date().toISOString(),
            profile: appData.profile,
            history: history,
            currentProgress: progress
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `forge50-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        alert('✅ Workout history exported successfully!');
    },
    
    /**
     * Clear all workout history with confirmation
     */
    clearHistory() {
        const confirmed = confirm(
            '⚠️ Are you sure you want to clear all workout history?\n\n' +
            'This will delete all completed workouts and cannot be undone.\n\n' +
            'Consider exporting your data first!'
        );
        
        if (confirmed) {
            const finalConfirm = confirm(
                'This is permanent. Clear all history?'
            );
            
            if (finalConfirm) {
                WorkoutStorage.clearAll();
                alert('✅ All history cleared.');
                this.render();
            }
        }
    }
};

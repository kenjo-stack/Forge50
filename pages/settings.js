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
        
        <button class="secondary-btn" data-action="export-data" style="margin-top: 12px;">
        📥 Export History
        </button>
        
        <button class="secondary-btn" data-action="clear-history" style="margin-top: 12px; background: #c73e1d;">
        🗑 Clear History
        </button>
        
        </div>
        
        ${App.isInstallable ? `
        <div class="card">
        
        <h2>Install App</h2>
        
        <p>Install Forge50 on your device for offline access and faster loading.</p>
        
        <button class="primary-btn" data-action="install-app">
        📲 Install Forge50
        </button>
        
        </div>
        ` : ''}
        
        <div class="card">
        
        <h2>About FORGE50</h2>
        
        <p><strong>Version:</strong> 1.1</p>
        <p><strong>Type:</strong> Progressive Web App (PWA)</p>
        <p><strong>Storage:</strong> Browser localStorage (no server)</p>
        <p><strong>Built with:</strong> HTML5, CSS3, JavaScript ES6</p>
        
        <p style="margin-top: 16px; color: #25c26e;">
        Your data stays on your device. All workouts are saved locally.
        </p>
        
        </div>
        
        `;
        
        html += App.renderBottomNav('settings');
        
        document.getElementById("app").innerHTML = html;
    },
    
    /**
     * Export workout history as JSON file
     */
    exportData() {
        const data = {
            workoutProgress: localStorage.getItem("forge50-workoutProgress"),
            workoutHistory: localStorage.getItem("forge50-workoutHistory"),
            exerciseLogbook: localStorage.getItem("forge50-exerciseLogbook"),
            personalRecords: localStorage.getItem("forge50-personalRecords"),
            exportDate: new Date().toISOString(),
            appVersion: "1.1"
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `forge50-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        showToast('✅ Workout history exported successfully!');
    },
    
    /**
     * Clear all workout history (with confirmation)
     */
    clearHistory() {
        const confirmed = confirm(
            '⚠️ Are you sure you want to clear ALL workout history?\n\n' +
            'This will permanently delete:\n' +
            '• All workout logs\n' +
            '• All personal records\n' +
            '• All progress data\n\n' +
            'This cannot be undone. Consider exporting first.'
        );
        
        if (confirmed) {
            const finalConfirm = confirm(
                '⚠️ FINAL WARNING:\n\n' +
                'This will permanently erase all your workout data. There is no undo.\n\n' +
                'Are you absolutely sure?'
            );
            
            if (finalConfirm) {
                localStorage.removeItem("forge50-workoutProgress");
                localStorage.removeItem("forge50-workoutHistory");
                localStorage.removeItem("forge50-exerciseLogbook");
                localStorage.removeItem("forge50-personalRecords");
                showToast('✅ All history cleared.');
            }
        }
    }
};
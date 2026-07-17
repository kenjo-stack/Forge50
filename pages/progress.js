// ==========================================
// ⚒ FORGE50 v0.5
// Progress & History Page
// ==========================================

/**
 * Progress page displays workout history and statistics
 */
const ProgressPage = {
    
    /**
     * Render progress page with workout history
     */
    render() {
        const history = WorkoutStorage.loadWorkoutHistory();
        const stats = this.calculateStats(history);
        
        let html = `
        
        <div class="card hero-card">
        
        <h1>📈 Progress</h1>
        
        <p>Your Workout History & Statistics</p>
        
        </div>
        
        `;
        
        // Display statistics summary
        html += `
        
        <div class="card">
        
        <h2>Overall Statistics</h2>
        
        <div class="stats-grid">
        
        <div class="stat-item">
        <p class="stat-label">Total Workouts</p>
        <p class="stat-value">${stats.totalWorkouts}</p>
        </div>
        
        <div class="stat-item">
        <p class="stat-label">Total Exercises</p>
        <p class="stat-value">${stats.totalExercises}</p>
        </div>
        
        <div class="stat-item">
        <p class="stat-label">Average Completion</p>
        <p class="stat-value">${stats.averageCompletion}%</p>
        </div>
        
        <div class="stat-item">
        <p class="stat-label">Total Minutes</p>
        <p class="stat-value">${stats.totalMinutes}</p>
        </div>
        
        </div>
        
        </div>
        
        `;
        
        // Display recent workouts
        if (history.length > 0) {
            html += `
            
            <div class="card">
            
            <h2>Recent Workouts</h2>
            
            `;
            
            const recentWorkouts = history.slice(-10).reverse();
            
            recentWorkouts.forEach(entry => {
                const date = new Date(entry.timestamp);
                const dateStr = date.toLocaleDateString();
                const timeStr = date.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
                
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
                
                <div class="progress-bar" style="height: 8px; margin-top: 8px;">
                <div class="progress-fill" style="width: ${entry.percentage}%; height: 100%;"></div>
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
            
            <button class="primary-btn" onclick="App.showWorkout()">
            Start First Workout
            </button>
            
            </div>
            
            `;
        }
        
        // Add navigation
        html += `
        
        <nav class="bottom-nav">
        
        <button onclick="App.showHome()">
        
        🏠<br>Home
        
        </button>
        
        <button onclick="App.showWorkout()">
        
        💪<br>Workout
        
        </button>
        
        <button class="active">
        
        📈<br>Progress
        
        </button>
        
        <button onclick="App.showSettings()">
        
        ⚙<br>Settings
        
        </button>
        
        </nav>
        
        `;
        
        document.getElementById("app").innerHTML = html;
    },
    
    /**
     * Calculate overall statistics from history
     * @param {array} history - Workout history array
     * @returns {object} Statistics object
     */
    calculateStats(history) {
        if (history.length === 0) {
            return {
                totalWorkouts: 0,
                totalExercises: 0,
                averageCompletion: 0,
                totalMinutes: 0
            };
        }
        
        const totalWorkouts = history.length;
        const totalExercises = history.reduce((sum, entry) => sum + entry.completedExercises, 0);
        const totalPercentage = history.reduce((sum, entry) => sum + entry.percentage, 0);
        const averageCompletion = Math.round(totalPercentage / history.length);
        const totalMinutes = history.reduce((sum, entry) => sum + (entry.duration || 0), 0);
        
        return {
            totalWorkouts,
            totalExercises,
            averageCompletion,
            totalMinutes
        };
    },
    
    /**
     * Format workout day name for display
     * @param {string} day - Workout day
     * @returns {string} Formatted day name
     */
    formatWorkoutName(day) {
        const names = {
            'sunday': 'Sunday',
            'tuesday': 'Tuesday',
            'wednesday': 'Wednesday / Thursday',
            'friday': 'Friday'
        };
        return names[day] || day;
    }
};

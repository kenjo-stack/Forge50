// ==========================================
// ⚒ FORGE50 v1.1
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
        
        // Weekly volume chart
        html += this.renderVolumeChart();
        
        // Display recent workouts
        if (history.length > 0) {
            html += `
            
            <div class="card">
            
            <h2>Recent Workouts</h2>
            
            `;
            
            const recentWorkouts = history.slice(-10).reverse();
            
            recentWorkouts.forEach(entry => {
                const date = new Date(entry.timestamp);
                const dateStr = date.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
                
                html += `
                
                <div class="history-item">
                
                <div class="history-header">
                <div>
                <p class="history-workout">${this.formatWorkoutName(entry.workout)}</p>
                <p class="history-date">${dateStr}</p>
                </div>
                <div class="history-stats">
                <p class="history-percentage">${entry.percentage}%</p>
                <p class="history-exercises">${entry.completedExercises}/${entry.totalExercises} exercises</p>
                </div>
                </div>
                
                <p class="history-duration">Duration: ${entry.duration} minutes</p>
                
                </div>
                
                `;
            });
            
            html += `</div>`;
        } else {
            html += `
            
            <div class="card">
            
            <h2>No Workouts Yet</h2>
            
            <p>Complete your first workout to see your progress here!</p>
            
            <button class="primary-btn" data-action="nav" data-page="workout">
            
            Start Workout
            
            </button>
            
            </div>
            
            `;
        }
        
        html += App.renderBottomNav('progress');
        
        document.getElementById("app").innerHTML = html;
    },
    
    /**
     * Render weekly volume chart by muscle group
     */
    renderVolumeChart() {
        const frequency = ExerciseLogbook.getMuscleGroupFrequency();
        const entries = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
        
        if (entries.length === 0) {
            return '';
        }
        
        const maxVal = entries[0][1];
        const topEntries = entries.slice(0, 8);
        
        let bars = '';
        topEntries.forEach(([muscle, count]) => {
            const pct = Math.round((count / maxVal) * 100);
            bars += `
            <div class="volume-bar-row">
            <span class="volume-bar-label">${muscle}</span>
            <div class="volume-bar-track">
            <div class="volume-bar-fill" style="width:${pct}%"></div>
            </div>
            <span class="volume-bar-value">${count} kg</span>
            </div>
            `;
        });
        
        return `
        <div class="card">
        <h2>Weekly Volume by Muscle</h2>
        <div class="volume-chart">
        ${bars}
        </div>
        </div>
        `;
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
        const totalExercises = history.reduce((sum, w) => sum + w.completedExercises, 0);
        const avgCompletion = Math.round(
            history.reduce((sum, w) => sum + w.percentage, 0) / totalWorkouts
        );
        const totalMinutes = history.reduce((sum, w) => sum + (w.duration || 0), 0);
        
        return {
            totalWorkouts,
            totalExercises,
            averageCompletion: avgCompletion,
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
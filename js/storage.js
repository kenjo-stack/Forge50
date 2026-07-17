// ==========================================
// ⚒ FORGE50 v0.5
// Workout Progress Storage Manager
// ==========================================

/**
 * Storage module handles all localStorage operations for workout progress
 * - Saves completed exercises to localStorage
 * - Loads progress on app launch
 * - Manages daily resets
 * - Tracks workout history
 */
const WorkoutStorage = {
    
    // Storage keys
    PROGRESS_KEY: "forge50-workoutProgress",
    HISTORY_KEY: "forge50-workoutHistory",
    
    /**
     * Get today's date key in YYYY-MM-DD format
     * @returns {string} Today's date as string
     */
    getTodayKey() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },
    
    /**
     * Save current workout progress to localStorage
     * @param {string} day - Workout day (sunday, tuesday, wednesday, friday)
     * @param {object} progress - Progress object with completed exercise indexes
     */
    saveWorkoutProgress(day, progress) {
        const key = this.getTodayKey();
        const allProgress = this.loadAllProgress();
        
        // Store progress for today's workout
        allProgress[key] = {
            date: key,
            workout: day,
            completed: progress.completed || [],
            startTime: progress.startTime || new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(allProgress));
    },
    
    /**
     * Load today's workout progress from localStorage
     * @param {string} day - Workout day
     * @returns {object} Progress object or empty if no progress saved
     */
    loadWorkoutProgress(day) {
        const key = this.getTodayKey();
        const allProgress = this.loadAllProgress();
        
        if (allProgress[key] && allProgress[key].workout === day) {
            return allProgress[key];
        }
        
        // Return fresh progress for new day or different workout
        return {
            date: key,
            workout: day,
            completed: [],
            startTime: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };
    },
    
    /**
     * Load all progress history
     * @returns {object} All progress entries keyed by date
     */
    loadAllProgress() {
        const stored = localStorage.getItem(this.PROGRESS_KEY);
        return stored ? JSON.parse(stored) : {};
    },
    
    /**
     * Save exercise completion status
     * @param {string} day - Workout day
     * @param {number} exerciseIndex - Index of completed exercise
     * @param {boolean} isCompleted - Whether exercise is completed
     */
    saveExerciseCompletion(day, exerciseIndex, isCompleted) {
        const progress = this.loadWorkoutProgress(day);
        
        if (isCompleted && !progress.completed.includes(exerciseIndex)) {
            progress.completed.push(exerciseIndex);
        } else if (!isCompleted) {
            progress.completed = progress.completed.filter(i => i !== exerciseIndex);
        }
        
        progress.lastUpdated = new Date().toISOString();
        this.saveWorkoutProgress(day, progress);
    },
    
    /**
     * Check if exercise is completed
     * @param {string} day - Workout day
     * @param {number} exerciseIndex - Index of exercise
     * @returns {boolean} True if completed
     */
    isExerciseCompleted(day, exerciseIndex) {
        const progress = this.loadWorkoutProgress(day);
        return progress.completed.includes(exerciseIndex);
    },
    
    /**
     * Get progress statistics for today
     * @param {string} day - Workout day
     * @param {number} totalExercises - Total exercises in workout
     * @returns {object} Stats with completed count and percentage
     */
    getProgressStats(day, totalExercises) {
        const progress = this.loadWorkoutProgress(day);
        const completed = progress.completed.length;
        const percentage = totalExercises > 0 
            ? Math.round((completed / totalExercises) * 100) 
            : 0;
        
        return {
            completed,
            total: totalExercises,
            percentage,
            isComplete: completed === totalExercises
        };
    },
    
    /**
     * Save completed workout to history
     * @param {string} day - Workout day
     * @param {number} totalExercises - Total exercises
     * @param {object} additionalData - Optional additional data
     */
    saveWorkoutHistory(day, totalExercises, additionalData = {}) {
        const progress = this.loadWorkoutProgress(day);
        const history = this.loadWorkoutHistory();
        
        const entry = {
            date: progress.date,
            timestamp: new Date().toISOString(),
            workout: day,
            completedExercises: progress.completed.length,
            totalExercises: totalExercises,
            percentage: Math.round((progress.completed.length / totalExercises) * 100),
            startTime: progress.startTime,
            endTime: new Date().toISOString(),
            duration: this.calculateDuration(progress.startTime),
            ...additionalData
        };
        
        history.push(entry);
        localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
        
        return entry;
    },
    
    /**
     * Load workout history
     * @returns {array} Array of completed workouts
     */
    loadWorkoutHistory() {
        const stored = localStorage.getItem(this.HISTORY_KEY);
        return stored ? JSON.parse(stored) : [];
    },
    
    /**
     * Calculate workout duration in minutes
     * @param {string} startTime - ISO timestamp
     * @returns {number} Duration in minutes
     */
    calculateDuration(startTime) {
        const start = new Date(startTime);
        const now = new Date();
        return Math.round((now - start) / 60000);
    },
    
    /**
     * Clear today's workout progress
     * @param {string} day - Workout day
     */
    clearWorkoutProgress(day) {
        const key = this.getTodayKey();
        const allProgress = this.loadAllProgress();
        delete allProgress[key];
        localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(allProgress));
    },
    
    /**
     * Get recent workout history (last N workouts)
     * @param {number} limit - Number of recent workouts to return
     * @returns {array} Recent workout entries
     */
    getRecentHistory(limit = 10) {
        const history = this.loadWorkoutHistory();
        return history.slice(-limit).reverse();
    },
    
    /**
     * Check if today is a new day and reset if needed
     * @returns {boolean} True if a new day has begun
     */
    checkNewDay() {
        const lastKey = localStorage.getItem("forge50-lastDayKey");
        const todayKey = this.getTodayKey();
        
        if (lastKey !== todayKey) {
            localStorage.setItem("forge50-lastDayKey", todayKey);
            return true;
        }
        
        return false;
    },
    
    /**
     * Clear all stored data (for debugging/testing)
     */
    clearAll() {
        localStorage.removeItem(this.PROGRESS_KEY);
        localStorage.removeItem(this.HISTORY_KEY);
        localStorage.removeItem("forge50-lastDayKey");
    }
};

// Backwards compatibility
const Storage = {
    KEY: "forge50-progress",
    
    load() {
        return JSON.parse(localStorage.getItem(this.KEY)) || {};
    },
    
    save(data) {
        localStorage.setItem(this.KEY, JSON.stringify(data));
    },
    
    set(id, value) {
        const data = this.load();
        data[id] = value;
        this.save(data);
    },
    
    get(id) {
        const data = this.load();
        return data[id] || false;
    },
    
    clear() {
        localStorage.removeItem(this.KEY);
    }
};

// Export to window
window.WorkoutStorage = WorkoutStorage;
window.Storage = Storage;

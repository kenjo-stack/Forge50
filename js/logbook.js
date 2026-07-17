// ==========================================
// ⚒ FORGE50 v0.5
// Exercise Logbook Storage Manager
// ==========================================

/**
 * ExerciseLogbook handles all exercise performance data
 * Stores detailed workout logs with weight, reps, and notes
 * Tracks personal records and progressive overload
 */
const ExerciseLogbook = {
    
    // Storage keys
    LOGBOOK_KEY: "forge50-exerciseLogbook",
    PR_KEY: "forge50-personalRecords",
    
    /**
     * Get today's date in YYYY-MM-DD format
     * @returns {string} Today's date
     */
    getTodayKey() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },
    
    /**
     * Save exercise log entry
     * @param {object} logEntry - Exercise performance data
     */
    saveExerciseLog(logEntry) {
        const logbook = this.loadAllLogs();
        
        // Create unique key for tracking
        const key = `${logEntry.day}_${logEntry.exercise}`;
        
        if (!logbook[key]) {
            logbook[key] = [];
        }
        
        // Add timestamp if not present
        if (!logEntry.timestamp) {
            logEntry.timestamp = Math.floor(Date.now() / 1000);
        }
        
        logEntry.date = this.getTodayKey();
        logbook[key].push(logEntry);
        
        localStorage.setItem(this.LOGBOOK_KEY, JSON.stringify(logbook));
        
        // Check for personal records
        this.updatePersonalRecords(logEntry);
        
        return logEntry;
    },
    
    /**
     * Load all exercise logs
     * @returns {object} All logs organized by exercise
     */
    loadAllLogs() {
        const stored = localStorage.getItem(this.LOGBOOK_KEY);
        return stored ? JSON.parse(stored) : {};
    },
    
    /**
     * Get last exercise performance
     * @param {string} day - Workout day
     * @param {string} exerciseName - Exercise name
     * @returns {object} Last exercise log or null
     */
    getLastExercise(day, exerciseName) {
        const logbook = this.loadAllLogs();
        const key = `${day}_${exerciseName}`;
        
        if (!logbook[key] || logbook[key].length === 0) {
            return null;
        }
        
        // Return most recent entry
        return logbook[key][logbook[key].length - 1];
    },
    
    /**
     * Get exercise history (last 10 workouts)
     * @param {string} day - Workout day
     * @param {string} exerciseName - Exercise name
     * @returns {array} Last 10 exercise logs, newest first
     */
    getExerciseHistory(day, exerciseName) {
        const logbook = this.loadAllLogs();
        const key = `${day}_${exerciseName}`;
        
        if (!logbook[key]) {
            return [];
        }
        
        // Return last 10, newest first
        return logbook[key].slice(-10).reverse();
    },
    
    /**
     * Update personal records if new best
     * @param {object} logEntry - Exercise log entry
     */
    updatePersonalRecords(logEntry) {
        const records = this.loadPersonalRecords();
        const exerciseKey = `${logEntry.exercise}_${logEntry.day}`;
        
        if (!records[exerciseKey]) {
            records[exerciseKey] = {
                exercise: logEntry.exercise,
                day: logEntry.day,
                weightPR: logEntry.weight,
                weightDate: logEntry.date,
                repPR: logEntry.reps,
                repDate: logEntry.date,
                repPRWeight: logEntry.weight
            };
        } else {
            // Check for weight PR
            if (logEntry.weight > records[exerciseKey].weightPR) {
                records[exerciseKey].weightPR = logEntry.weight;
                records[exerciseKey].weightDate = logEntry.date;
            }
            
            // Check for rep PR at same weight
            if (logEntry.weight === records[exerciseKey].repPRWeight &&
                logEntry.reps > records[exerciseKey].repPR) {
                records[exerciseKey].repPR = logEntry.reps;
                records[exerciseKey].repDate = logEntry.date;
            }
            
            // Check for weight milestone - reps PR even at higher weight
            if (logEntry.weight > records[exerciseKey].repPRWeight &&
                logEntry.reps >= records[exerciseKey].repPR) {
                records[exerciseKey].repPR = logEntry.reps;
                records[exerciseKey].repDate = logEntry.date;
                records[exerciseKey].repPRWeight = logEntry.weight;
            }
        }
        
        localStorage.setItem(this.PR_KEY, JSON.stringify(records));
    },
    
    /**
     * Get personal record for an exercise
     * @param {string} day - Workout day
     * @param {string} exerciseName - Exercise name
     * @returns {object} Personal record or null
     */
    getPersonalRecord(day, exerciseName) {
        const records = this.loadPersonalRecords();
        const key = `${exerciseName}_${day}`;
        return records[key] || null;
    },
    
    /**
     * Load all personal records
     * @returns {object} All personal records
     */
    loadPersonalRecords() {
        const stored = localStorage.getItem(this.PR_KEY);
        return stored ? JSON.parse(stored) : {};
    },
    
    /**
     * Save personal record
     * @param {object} pr - Personal record object
     */
    savePersonalRecord(pr) {
        const records = this.loadPersonalRecords();
        const key = `${pr.exercise}_${pr.day}`;
        records[key] = pr;
        localStorage.setItem(this.PR_KEY, JSON.stringify(records));
    },
    
    /**
     * Get suggested weight for progressive overload
     * @param {string} day - Workout day
     * @param {string} exerciseName - Exercise name
     * @param {string} targetReps - Target rep range (e.g. "8-10")
     * @returns {object} Suggestion with weight and reason
     */
    getSuggestedWeight(day, exerciseName, targetReps) {
        const lastExercise = this.getLastExercise(day, exerciseName);
        
        if (!lastExercise) {
            return {
                weight: null,
                reason: "No previous data",
                increaseWeight: false
            };
        }
        
        // Parse target reps (e.g. "8-10" -> [8, 10])
        const [minReps, maxReps] = targetReps.split('-').map(Number);
        
        // If reached top of rep range, suggest weight increase
        if (lastExercise.reps >= maxReps) {
            // Typical increment based on weight
            const increment = lastExercise.weight < 10 ? 1.25 :
                            lastExercise.weight < 20 ? 2.5 :
                            5;
            
            return {
                weight: lastExercise.weight + increment,
                reason: "Reached target reps - time to increase!",
                increaseWeight: true,
                lastWeight: lastExercise.weight
            };
        }
        
        // Otherwise keep current weight
        return {
            weight: lastExercise.weight,
            reason: "Keep building reps",
            increaseWeight: false,
            lastWeight: lastExercise.weight
        };
    },
    
    /**
     * Get all PRs for progress page
     * @returns {array} Array of all personal records
     */
    getAllPersonalRecords() {
        return Object.values(this.loadPersonalRecords());
    },
    
    /**
     * Calculate total volume lifted
     * @returns {number} Total kg lifted
     */
    getTotalVolume() {
        const logbook = this.loadAllLogs();
        let totalVolume = 0;
        
        Object.values(logbook).forEach(exerciseLogs => {
            exerciseLogs.forEach(log => {
                totalVolume += (log.weight * log.reps);
            });
        });
        
        return totalVolume;
    },
    
    /**
     * Get muscle group frequency
     * @returns {object} Count by muscle group
     */
    getMuscleGroupFrequency() {
        const logbook = this.loadAllLogs();
        const frequency = {};
        
        Object.values(logbook).forEach(exerciseLogs => {
            exerciseLogs.forEach(log => {
                const muscle = log.muscle || 'Unknown';
                frequency[muscle] = (frequency[muscle] || 0) + 1;
            });
        });
        
        return frequency;
    },
    
    /**
     * Get most trained muscle group
     * @returns {string} Muscle group with most exercises
     */
    getMostTrainedMuscle() {
        const frequency = this.getMuscleGroupFrequency();
        
        if (Object.keys(frequency).length === 0) {
            return 'None yet';
        }
        
        return Object.keys(frequency).reduce((a, b) =>
            frequency[a] > frequency[b] ? a : b
        );
    },
    
    /**
     * Check if this is a new PR
     * @param {object} logEntry - Exercise log entry
     * @returns {object} PR status
     */
    checkNewPR(logEntry) {
        const pr = this.getPersonalRecord(logEntry.day, logEntry.exercise);
        
        const result = {
            isWeightPR: false,
            isRepPR: false
        };
        
        if (!pr) {
            result.isWeightPR = true;
            result.isRepPR = true;
            return result;
        }
        
        if (logEntry.weight > pr.weightPR) {
            result.isWeightPR = true;
        }
        
        if (logEntry.weight === pr.repPRWeight && logEntry.reps > pr.repPR) {
            result.isRepPR = true;
        }
        
        return result;
    },
    
    /**
     * Clear all logbook data
     */
    clearAll() {
        localStorage.removeItem(this.LOGBOOK_KEY);
        localStorage.removeItem(this.PR_KEY);
    }
};

// Export to window
window.ExerciseLogbook = ExerciseLogbook;
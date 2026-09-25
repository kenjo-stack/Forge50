// ==========================================
// ⚒ FORGE50 v0.8
// Smart Rest Timer — Android Optimized
// ==========================================

const Timer = {

    duration: 120,
    remaining: 120,
    interval: null,
    endTime: null,
    pausedRemaining: null,
    storageKey: "forge50-rest-timer",

    format(seconds) {
        const safe = Math.max(0, Math.round(seconds));
        const m = Math.floor(safe / 60);
        const s = safe % 60;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    },

    parseRest(rest) {
        if (!rest) return 120;
        const text = String(rest).toLowerCase().replace(/[–—]/g, "-");
        const numbers = [...text.matchAll(/(\d+(?:\.\d+)?)/g)].map(m => Number(m[1]));
        if (!numbers.length) return 120;

        // For ranges such as "2-3 min" or "60-90 sec", use the upper end.
        const value = numbers.length > 1 ? Math.max(...numbers) : numbers[0];
        return text.includes("min") ? Math.round(value * 60) : Math.round(value);
    },

    setDuration(seconds, label = "") {
        const value = Math.max(1, Math.round(Number(seconds) || 120));
        this.pause();
        this.duration = value;
        this.remaining = value;
        this.endTime = null;
        this.pausedRemaining = value;
        this.activeLabel = label || this.activeLabel || "Rest Timer";
        this.saveState();
        this.update();
    },

    start(seconds = null, label = "") {
        if (seconds !== null && seconds !== undefined) {
            this.setDuration(seconds, label);
        }

        if (this.interval) return;
        if (this.remaining <= 0) this.remaining = this.duration || 120;

        this.endTime = Date.now() + this.remaining * 1000;
        this.pausedRemaining = null;
        this.saveState();
        this.update();
        this._tick();
    },

    _tick() {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            if (!this.endTime) return;
            this.remaining = Math.max(0, Math.ceil((this.endTime - Date.now()) / 1000));
            this.update();
            if (this.remaining <= 0) this.finish();
        }, 250);
    },

    pause() {
        if (this.endTime) {
            this.remaining = Math.max(0, Math.ceil((this.endTime - Date.now()) / 1000));
        }
        clearInterval(this.interval);
        this.interval = null;
        this.endTime = null;
        this.pausedRemaining = this.remaining;
        this.saveState();
        this.update();
    },

    resume() {
        if (this.interval) return;
        if (this.remaining <= 0) return;
        this.start();
    },

    reset() {
        this.pause();
        this.remaining = this.duration;
        this.pausedRemaining = this.duration;
        this.saveState();
        this.update();
    },

    add(seconds) {
        const amount = Math.round(Number(seconds) || 0);
        if (!amount) return;
        if (this.endTime) {
            this.endTime += amount * 1000;
            this.remaining = Math.max(0, Math.ceil((this.endTime - Date.now()) / 1000));
        } else {
            this.remaining = Math.max(0, this.remaining + amount);
            this.duration = Math.max(this.duration, this.remaining);
        }
        this.saveState();
        this.update();
    },

    skip() {
        clearInterval(this.interval);
        this.interval = null;
        this.endTime = null;
        this.remaining = 0;
        this.clearState();
        this.update();
        this.showStatus("⏭ Rest skipped", "info");
    },

    finish() {
        clearInterval(this.interval);
        this.interval = null;
        this.endTime = null;
        this.remaining = 0;
        this.clearState();
        this.update();

        if (navigator.vibrate) {
            navigator.vibrate([300, 150, 300, 150, 600]);
        }

        this.playAlarm();
        this.showStatus("⏰ Rest complete! Next set.", "success");
    },

    showStatus(message, type = "success") {
        if (typeof WorkoutPage !== "undefined" && WorkoutPage.showToast) {
            WorkoutPage.showToast(message, type);
        }
    },

    playAlarm() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const now = ctx.currentTime;
            const gain = ctx.createGain();
            const osc = ctx.createOscillator();
            osc.type = "sine";
            osc.frequency.setValueAtTime(880, now);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.exponentialRampToValueAtTime(0.2, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.5);
            setTimeout(() => ctx.close().catch(() => {}), 700);
        } catch (e) {
            // Audio is optional; vibration still provides feedback.
        }
    },

    saveState() {
        try {
            sessionStorage.setItem(this.storageKey, JSON.stringify({
                duration: this.duration,
                remaining: this.remaining,
                endTime: this.endTime,
                activeLabel: this.activeLabel || "Rest Timer"
            }));
        } catch (e) {}
    },

    clearState() {
        try { sessionStorage.removeItem(this.storageKey); } catch (e) {}
        this.activeLabel = "Rest Timer";
    },

    restoreState() {
        try {
            const raw = sessionStorage.getItem(this.storageKey);
            if (!raw) return;
            const state = JSON.parse(raw);
            this.duration = Number(state.duration) || 120;
            this.activeLabel = state.activeLabel || "Rest Timer";

            if (state.endTime) {
                const left = Math.max(0, Math.ceil((Number(state.endTime) - Date.now()) / 1000));
                if (left > 0) {
                    this.remaining = left;
                    this.endTime = Number(state.endTime);
                    this._tick();
                } else {
                    this.remaining = 0;
                    this.endTime = null;
                    this.clearState();
                }
            } else {
                this.remaining = Math.max(0, Number(state.remaining) || this.duration);
                this.pausedRemaining = this.remaining;
            }
            this.update();
        } catch (e) {}
    },

    update() {
        const display = document.getElementById("timerDisplay");
        const label = document.getElementById("timerLabel");
        const startButton = document.getElementById("timerStartBtn");
        const pauseButton = document.getElementById("timerPauseBtn");
        const guidedToggle = document.getElementById("guidedTimerToggle");

        if (display) {
            display.textContent = this.format(this.remaining);
            display.classList.toggle("timer-warning", this.remaining <= 10 && this.remaining > 0);
            display.classList.toggle("timer-running", !!this.interval);
        }
        if (label) label.textContent = this.activeLabel || "Rest Timer";
        if (startButton) startButton.textContent = this.interval ? "⏱ Running" : "▶ Start Rest";
        if (pauseButton) pauseButton.disabled = !this.interval;
        if (guidedToggle) guidedToggle.textContent = this.interval ? "Pause rest" : "Start rest";
    }

};

window.Timer = Timer;

// Restore a running/paused timer after navigation or a browser refresh.
document.addEventListener("DOMContentLoaded", () => Timer.restoreState());

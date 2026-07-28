// ==========================================
// ⚒ FORGE50 v0.5
// Smart Rest Timer
// ==========================================

/**
 * Show a non-blocking toast notification
 * @param {string} message - Message to display
 */
function showToast(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = 'toast-notification';
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-fade');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

/**
 * Play a short beep sound using Web Audio API (works offline, zero bytes)
 */
function playBeep() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}
}

const Timer = {

    duration: 120,
    remaining: 120,
    _raf: null,
    running: false,
    _startTime: null,

    parseRest(rest) {
        rest = rest.toLowerCase();
        if (rest.includes("2-3")) return 150;
        if (rest.includes("3")) return 180;
        if (rest.includes("2")) return 120;
        if (rest.includes("90")) return 90;
        if (rest.includes("60")) return 60;
        return 60;
    },

    start(rest) {
        if (rest) {
            this.duration = this.parseRest(rest);
            this.remaining = this.duration;
        }

        this._cancel();

        this.running = true;
        this._startTime = Date.now();
        this.updateDisplay();
        this._tick();
    },

    pause() {
        this._cancel();
        if (this.running) {
            this.running = false;
            this.remaining = Math.max(0, this.remaining);
        }
    },

    resume() {
        if (this.running) return;

        this.running = true;
        this._startTime = Date.now() - (this.duration - this.remaining) * 1000;
        this._tick();
    },

    reset() {
        this._cancel();
        this.running = false;
        this.remaining = this.duration;
        this.updateDisplay();
    },

    skip() {
        this._cancel();
        this.running = false;
        this.remaining = 0;
        this.updateDisplay();
    },

    finish() {
        if (navigator.vibrate) {
            navigator.vibrate([300, 150, 300]);
        }

        playBeep();

        showToast("Rest complete! Next exercise.");
    },

    updateDisplay() {
        const display = document.getElementById("timerDisplay");
        if (!display) return;

        const mins = Math.floor(this.remaining / 60);
        const secs = Math.floor(this.remaining % 60);

        display.textContent =
            `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

        display.style.color = this.remaining <= 10 ? "#ff3030" : "#ff7a00";
    },

    _cancel() {
        if (this._raf) {
            cancelAnimationFrame(this._raf);
            this._raf = null;
        }
    },

    _tick() {
        if (!this.running) return;

        const elapsed = (Date.now() - this._startTime) / 1000;
        this.remaining = Math.max(0, this.duration - elapsed);

        this.updateDisplay();

        if (this.remaining <= 0) {
            this._cancel();
            this.running = false;
            this.finish();
            return;
        }

        this._raf = requestAnimationFrame(() => this._tick());
    }

};
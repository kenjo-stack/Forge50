// ==========================================
// ⚒ FORGE50 v0.5
// Core Application
// ==========================================

const App = {

    currentPage: "home",
    currentWorkout: "sunday",
    _eventsInitialized: false,
    _deferredPrompt: null,
    isInstallable: false,

    init() {

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("./sw.js");

            // Listen for SW update notifications
            navigator.serviceWorker.addEventListener("message", (event) => {
                if (event.data && event.data.type === "SW_UPDATE_AVAILABLE") {
                    showToast("Forge50 updated! Refresh for the latest version.");
                }
            });
        }

        // Global error handler
        window.onerror = (msg, url, line, col, error) => {
            console.error(`Forge50 Error: ${msg} at ${url}:${line}:${col}`, error);
            showToast("Something went wrong. Please try again.");
            return false;
        };

        window.addEventListener("unhandledrejection", (event) => {
            console.error("Forge50 Unhandled Promise:", event.reason);
            showToast("Something went wrong. Please try again.");
        });

        this.showHome();
        this.initPageEvents();
        this.initKeyboardEvents();
        this.initInstallPrompt();

    },

    /**
     * Set up global event delegation on #app
     */
    initPageEvents() {
        if (this._eventsInitialized) return;
        this._eventsInitialized = true;

        const app = document.getElementById("app");

        app.addEventListener("click", (e) => {
            const el = e.target.closest("[data-action]");
            if (!el) return;

            const action = el.dataset.action;
            const d = el.dataset;

            switch (action) {
                case "nav":
                    App.showPage(d.page);
                    break;
                case "install-app":
                    App.promptInstall();
                    break;
                case "load-workout":
                    WorkoutPage.load(d.day);
                    break;
                case "complete-exercise":
                    WorkoutPage.completeExercise(
                        d.day, d.exercise, d.reps, d.rir,
                        parseInt(d.index), d.muscle
                    );
                    break;
                case "exercise-history":
                    WorkoutPage.showExerciseModal(d.day, d.exercise, parseInt(d.index));
                    break;
                case "close-modal":
                    WorkoutPage.closeExerciseModal();
                    break;
                case "start-rest":
                    Timer.start(WorkoutPage.lastRestPeriod);
                    break;
                case "pause-timer":
                    Timer.pause();
                    break;
                case "reset-timer":
                    Timer.reset();
                    break;
                case "resume-timer":
                    Timer.resume();
                    break;
                case "skip-timer":
                    Timer.skip();
                    break;
                case "export-data":
                    SettingsPage.exportData();
                    break;
                case "clear-history":
                    SettingsPage.clearHistory();
                    break;
            }
        });

        app.addEventListener("change", (e) => {
            const el = e.target.closest("[data-action]");
            if (!el) return;

            const action = el.dataset.action;

            if (action === "exercise-check") {
                WorkoutPage.handleExerciseCheck(
                    el.dataset.day, parseInt(el.dataset.index), el.checked
                );
            }
        });
    },

    /**
     * Set up global keyboard shortcuts
     */
    initKeyboardEvents() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                const modal = document.getElementById("exerciseModal");
                if (modal && modal.style.display === "block") {
                    WorkoutPage.closeExerciseModal();
                    e.preventDefault();
                }
            }
        });
    },

    /**
     * Set up PWA install prompt handling
     */
    initInstallPrompt() {
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            App._deferredPrompt = e;
            App.isInstallable = true;
        });

        window.addEventListener("appinstalled", () => {
            App._deferredPrompt = null;
            App.isInstallable = false;
        });
    },

    /**
     * Show the deferred install prompt
     */
    async promptInstall() {
        if (!this._deferredPrompt) return;
        this._deferredPrompt.prompt();
        const result = await this._deferredPrompt.userChoice;
        this._deferredPrompt = null;
        this.isInstallable = false;
    },

    /**
     * Focus the first heading in the app container after page render
     */
    focusFirstHeading() {
        requestAnimationFrame(() => {
            const app = document.getElementById("app");
            const heading = app.querySelector("h1, h2, [tabindex='-1']");
            if (heading) {
                heading.setAttribute("tabindex", "-1");
                heading.focus({ preventScroll: true });
            }
        });
    },

    /**
     * Navigate to a page by id
     */
    showPage(pageId) {
        switch (pageId) {
            case "home": this.showHome(); break;
            case "workout": this.showWorkout(); break;
            case "progress": this.showProgress(); break;
            case "settings": this.showSettings(); break;
        }
    },

    showHome() {
        this.currentPage = "home";
        if (typeof HomePage !== "undefined") {
            try {
                HomePage.render();
            } catch (e) {
                console.error("Failed to render home page:", e);
                showToast("Failed to load page. Please try again.");
            }
            this.focusFirstHeading();
        }
    },

    showWorkout(day = this.currentWorkout) {
        this.currentPage = "workout";
        this.currentWorkout = day;
        if (typeof WorkoutPage !== "undefined") {
            try {
                WorkoutPage.load(day);
            } catch (e) {
                console.error("Failed to render workout page:", e);
                showToast("Failed to load page. Please try again.");
            }
            this.focusFirstHeading();
        }
    },

    showProgress() {
        this.currentPage = "progress";
        if (typeof ProgressPage !== "undefined") {
            try {
                ProgressPage.render();
            } catch (e) {
                console.error("Failed to render progress page:", e);
                showToast("Failed to load page. Please try again.");
            }
            this.focusFirstHeading();
        }
    },

    showSettings() {
        this.currentPage = "settings";
        if (typeof SettingsPage !== "undefined") {
            try {
                SettingsPage.render();
            } catch (e) {
                console.error("Failed to render settings page:", e);
                showToast("Failed to load page. Please try again.");
            }
            this.focusFirstHeading();
        }
    },

    /**
     * Render shared bottom navigation with active page highlight
     */
    renderBottomNav(activePage) {
        const pages = [
            { id: "home", label: "Home", icon: "\u{1F3E0}" },
            { id: "workout", label: "Workout", icon: "\u{1F4AA}" },
            { id: "progress", label: "Progress", icon: "\u{1F4C8}" },
            { id: "settings", label: "Settings", icon: "\u2699" }
        ];

        return `
        <nav class="bottom-nav" aria-label="Main navigation">
        ${pages.map(p => `
        <button class="${activePage === p.id ? 'active' : ''}" data-action="nav" data-page="${p.id}" aria-current="${activePage === p.id ? 'page' : 'false'}">
        ${p.icon}<br>${p.label}
        </button>
        `).join('')}
        </nav>
        `;
    }

};

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});
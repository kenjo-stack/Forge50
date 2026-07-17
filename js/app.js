// ==========================================
// ⚒ FORGE50 v0.5
// Core Application
// ==========================================

const App = {

    currentPage: "home",
    currentWorkout: "sunday",

    init() {

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("./sw.js");
        }

        this.showHome();

    },

    showHome() {

        this.currentPage = "home";

        if (typeof HomePage !== "undefined") {
            HomePage.render();
        }

    },

    showWorkout(day = this.currentWorkout) {

        this.currentPage = "workout";
        this.currentWorkout = day;

        if (typeof WorkoutPage !== "undefined") {
            WorkoutPage.load(day);
        }

    },

    showProgress() {

        this.currentPage = "progress";

        if (typeof ProgressPage !== "undefined") {
            ProgressPage.render();
        }

    },

    showSettings() {

        this.currentPage = "settings";

        if (typeof SettingsPage !== "undefined") {
            SettingsPage.render();
        }

    }

};

// Backwards compatibility with old code
const Router = {

    showHome() {
        App.showHome();
    },

    showWorkout(day = "sunday") {
        App.showWorkout(day);
    },

    showProgress() {
        App.showProgress();
    },

    showSettings() {
        App.showSettings();
    }

};

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});
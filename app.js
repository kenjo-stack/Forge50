// ==========================================
// ⚒ FORGE50 v0.2
// Main Application
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    initialiseNavigation();

    initialiseHomeButton();

    updateDashboard();

});

// ==========================================
// Navigation
// ==========================================

function initialiseNavigation() {

    const buttons = document.querySelectorAll(".nav-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const screen = button.dataset.screen;

            showScreen(screen);

            buttons.forEach(b => b.classList.remove("active"));

            button.classList.add("active");

        });

    });

}

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {

        screen.classList.remove("active");

    });

    const selected = document.getElementById(screenId);

    if (selected) {

        selected.classList.add("active");

    }

    if (screenId === "workoutScreen") {

        loadWorkout(currentDay);

    }

}

// ==========================================
// Home Screen
// ==========================================

function initialiseHomeButton() {

    const button = document.querySelector(".primary-btn");

    if (!button) return;

    button.addEventListener("click", () => {

        showScreen("workoutScreen");

        document
            .querySelector('[data-screen="workoutScreen"]')
            .classList.add("active");

        document
            .querySelectorAll(".nav-btn")
            .forEach(btn => btn.classList.remove("active"));

        document
            .querySelector('[data-screen="workoutScreen"]')
            .classList.add("active");

    });

}

// ==========================================
// Dashboard
// ==========================================

function updateDashboard() {

    console.log("⚒ FORGE50");

    console.log(appData.profile);

}

// ==========================================
// Local Storage
// ==========================================

function saveData() {

    localStorage.setItem(

        "forge50",

        JSON.stringify(appData)

    );

}

function loadData() {

    const saved = localStorage.getItem("forge50");

    if (!saved) return;

    console.log("Progress Loaded");

}

// ==========================================
// Recovery (future)
// ==========================================

function calculateRecovery() {

    return {

        chest:100,

        shoulders:82,

        triceps:100,

        back:96,

        biceps:100,

        legs:100

    };

}

// ==========================================
// Progress (future)
// ==========================================

function updateProgress() {

    const bar = document.querySelector(".progressFill");

    if (!bar) return;

    bar.style.width = "25%";

}

// ==========================================

window.onload = () => {

    loadData();

    updateProgress();

};
if ("serviceWorker" in navigator) {

    navigator.serviceWorker
        .register("sw.js")
        .then(() => console.log("Forge50 Ready"));

}
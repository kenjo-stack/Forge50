// ==========================================
// ⚒ FORGE50 v0.8
// Core Application
// ==========================================

const App = {

    currentPage: "home",
    currentWorkout: "sunday",
    _deferredInstall: null,

    init() {

        // Register service worker with update detection
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("./sw.js").then(reg => {
                reg.addEventListener("updatefound", () => {
                    const newSW = reg.installing;
                    newSW.addEventListener("statechange", () => {
                        if (newSW.state === "installed" && navigator.serviceWorker.controller) {
                            App.showUpdateNotification(reg);
                        }
                    });
                });
            }).catch(() => {
                // SW registration failed — app still works without it
            });

            let refreshing = false;
            navigator.serviceWorker.addEventListener("controllerchange", () => {
                if (!refreshing) {
                    refreshing = true;
                    window.location.reload();
                }
            });
        }

        // Install prompt
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            App._deferredInstall = e;
            App.showInstallBanner();
        });

        // Offline detection
        window.addEventListener("online", () => {
            App.hideOfflineBanner();
        });
        window.addEventListener("offline", () => {
            App.showOfflineBanner();
        });

        this.showHome();
    },

    /**
     * Clean up resources when leaving a page
     */
    cleanupPage() {
        // Do not stop the rest timer when navigating between app pages.
        // Timer uses wall-clock time and sessionStorage so it remains accurate
        // while the user changes pages or the phone is backgrounded/locked.
        const toast = document.getElementById("forgeToast");
        if (toast) toast.remove();
    },

    /**
     * Show install banner when PWA install is available
     */
    showInstallBanner() {
        if (document.getElementById("forgeInstallBanner")) return;

        const banner = document.createElement("div");
        banner.id = "forgeInstallBanner";
        banner.className = "install-banner";
        banner.setAttribute("role", "banner");
        banner.innerHTML = `
          <span>📲 Install FORGE50 for the best experience</span>
          <button onclick="App.installApp()" aria-label="Install app">Install</button>
          <button onclick="this.parentElement.remove()" aria-label="Dismiss" style="background:none;border:none;color:var(--muted);font-size:18px;cursor:pointer;padding:4px 8px;">✕</button>
        `;
        document.body.appendChild(banner);
    },

    /**
     * Trigger PWA install
     */
    installApp() {
        if (!App._deferredInstall) return;
        App._deferredInstall.prompt();
        App._deferredInstall.userChoice.then(choice => {
            if (choice.outcome === "accepted") {
                const banner = document.getElementById("forgeInstallBanner");
                if (banner) banner.remove();
            }
            App._deferredInstall = null;
        });
    },

    /**
     * Show offline indicator
     */
    showOfflineBanner() {
        if (document.getElementById("forgeOfflineBanner")) return;

        const banner = document.createElement("div");
        banner.id = "forgeOfflineBanner";
        banner.className = "offline-banner";
        banner.setAttribute("role", "alert");
        banner.setAttribute("aria-live", "assertive");
        banner.innerHTML = `<span>📡 You're offline — data saved locally</span>`;
        document.body.appendChild(banner);
    },

    /**
     * Hide offline indicator
     */
    hideOfflineBanner() {
        const banner = document.getElementById("forgeOfflineBanner");
        if (banner) banner.remove();
    },

    /**
     * Show update available notification
     */
    showUpdateNotification(reg) {
        const existing = document.getElementById("forgeUpdateBanner");
        if (existing) return;

        const banner = document.createElement("div");
        banner.id = "forgeUpdateBanner";
        banner.style.cssText = [
            "position:fixed;top:20px;left:50%;transform:translateX(-50%)",
            "background:#1b2028;color:#fff;padding:14px 20px;border-radius:14px",
            "font-weight:600;font-size:14px;z-index:500",
            "box-shadow:0 8px 32px rgba(0,0,0,0.6)",
            "border:1px solid rgba(255,122,0,0.2)",
            "display:flex;align-items:center;gap:14px",
            "max-width:90%;animation:slideUp 0.3s ease"
        ].join(";");
        banner.innerHTML = [
            '<span>⚡ New version available</span>',
            '<button style="background:#ff7a00;border:none;color:#fff;',
            'padding:8px 18px;border-radius:10px;font-weight:700;',
            'font-size:13px;cursor:pointer;" onclick="App.applyUpdate()" aria-label="Update app">Update</button>'
        ].join("");
        document.body.appendChild(banner);

        App._updateReg = reg;
    },

    applyUpdate() {
        if (App._updateReg && App._updateReg.waiting) {
            App._updateReg.waiting.postMessage("SKIP_WAITING");
        }
        const banner = document.getElementById("forgeUpdateBanner");
        if (banner) banner.remove();
    },

    /**
     * Safely render a page with error boundary
     */
    renderPage(pageName, renderFn) {
        this.cleanupPage();
        try {
            renderFn();
        } catch (err) {
            console.error("Error rendering " + pageName + ":", err);
            const app = document.getElementById("app");
            if (app) {
                app.innerHTML = [
                    '<div class="card" style="text-align:center;padding:40px 24px;" role="alert">',
                    '  <p style="font-size:40px;margin-bottom:16px;" aria-hidden="true">⚠️</p>',
                    '  <h2>Something went wrong</h2>',
                    '  <p>Could not load ' + pageName + ' page. Please try again.</p>',
                    '  <button class="primary-btn" onclick="App.showHome()" style="margin-top:20px;">Back to Home</button>',
                    '  <p style="font-size:12px;color:var(--muted);margin-top:20px;">' + (err.message || 'Unknown error') + '</p>',
                    '</div>',
                    '<nav class="bottom-nav" role="navigation" aria-label="Main navigation">',
                    '  <button onclick="App.showHome()" aria-label="Home">🏠<br>Home</button>',
                    '  <button onclick="App.showWorkout()" aria-label="Workout">💪<br>Workout</button>',
                    '  <button onclick="App.showProgress()" aria-label="Progress">📈<br>Progress</button>',
                    '  <button onclick="App.showSettings()" aria-label="Settings">⚙<br>Settings</button>',
                    '</nav>'
                ].join("\n");
            }
        }
    },

    showHome() {
        this.renderPage("home", () => {
            HomePage.render();
        });
    },

    showWorkout(day) {
        day = day || this.currentWorkout;
        this.currentWorkout = day;
        this.renderPage("workout", () => {
            WorkoutPage.load(day);
        });
    },

    showProgress() {
        this.renderPage("progress", () => {
            ProgressPage.render();
        });
    },

    showSettings() {
        this.renderPage("settings", () => {
            SettingsPage.render();
        });
    }

};

// Backwards compatibility
const Router = {
    showHome() { App.showHome(); },
    showWorkout(day) { App.showWorkout(day); },
    showProgress() { App.showProgress(); },
    showSettings() { App.showSettings(); }
};

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});

/**
 * Theme Switcher
 * Stores the user's theme preference in local storage and applies it to the page.
 * Uses .theme_base.u-theme-light and .theme_base.u-theme-dark classes to control the theme.
 * 
 * Author FCD x Gemini AI
 * Version 1.0.1
 */

// 1. Get the current preference from local storage, default to config setting
const getPreference = () => localStorage.getItem(themeConfig.storageKey) || themeConfig.defaultPreference;

// 2. Core function to apply the visual theme
const applyTheme = (theme) => {
    let isDark = false;

    if (theme === 'dark') {
    isDark = true;
    } else if (theme === 'light') {
    isDark = false;
    } else if (theme === 'system') {
    // Detect system preference
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Add or remove the class based on the result
    if (isDark) {
    document.body.classList.add(themeConfig.darkClass);
    } else {
    document.body.classList.remove(themeConfig.darkClass);
    }
};

// 3. Update the visual state of the 3-way buttons
const updateUI = (activeTheme) => {
    document.querySelectorAll('[data-theme-switch]').forEach(btn => {
    const btnTheme = btn.getAttribute('data-theme-switch');
    // Set aria-pressed for accessibility and CSS styling
    btn.setAttribute('aria-pressed', btnTheme === activeTheme);
    });
};

// 4. Function to handle user clicking a button
const setPreference = (theme) => {
    localStorage.setItem(themeConfig.storageKey, theme);
    applyTheme(theme);
    updateUI(theme);
};

// --- Initialization ---

// Apply the theme immediately to prevent a "flash" of the wrong color
const initialTheme = getPreference();
applyTheme(initialTheme);

// Listen for changes to the OS/System theme setting in real-time
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    // Only auto-update the UI if the user has 'system' selected
    if (getPreference() === 'system') {
    applyTheme('system');
    }
});

// Wait for the DOM to load before attaching click events to buttons
window.addEventListener('DOMContentLoaded', () => {
    updateUI(initialTheme);

    document.querySelectorAll('[data-theme-switch]').forEach(btn => {
    btn.addEventListener('click', () => {
        // Grabbing the attribute directly from the 'btn' variable
        const selectedTheme = btn.getAttribute('data-theme-switch');
        setPreference(selectedTheme);
    });
    });

});
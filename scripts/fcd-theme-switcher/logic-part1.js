/**
 * Theme Switcher Part 1
 * Stores the user's theme preference in local storage and applies it to the page.
 * Uses .theme_base.u-theme-light and .theme_base.u-theme-dark classes to control the theme.
 * 
 * Author FCD x Gemini AI
 * Version 1.1.2
 */


// 1. Get the current preference from local storage
const getPreference = () => localStorage.getItem(themeConfig.storageKey) || themeConfig.defaultPreference;

// 2. Core function to apply the visual theme
const applyTheme = (theme) => {
    let isDark = false;

    if (theme === 'dark') {
    isDark = true;
    } else if (theme === 'light') {
    isDark = false;
    } else if (theme === 'system') {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // We can safely target document.body now because this script is inside the <body>
    if (isDark) {
    document.body.classList.add(themeConfig.darkClass);
    } else {
    document.body.classList.remove(themeConfig.darkClass);
    }
};

// --- Critical Initialization ---
// Apply the theme IMMEDIATELY in the <head> before the body renders
applyTheme(getPreference());
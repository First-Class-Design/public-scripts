/**
 * Theme Switcher Part 1
 * Stores the user's theme preference in local storage and applies it to the page.
 * Uses .theme_base.u-theme-light and .theme_base.u-theme-dark classes to control the theme.
 * 
 * Author FCD x Gemini AI
 * Version 1.1.1
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

    // We use document.documentElement (the <html> tag) if the <body> isn't loaded yet.
    // But adding it directly to document.body is safe here if placed properly.
    // In the <head>, document.body might be null, so we use document.documentElement for safety
    // Alternatively, we can just force the class onto document.documentElement and update CSS.
    // For Webflow, doing this on the <html> element is actually best practice for theme flashes.
    
    const targetElement = document.documentElement; // Targets the <html> tag

    if (isDark) {
    targetElement.classList.add(themeConfig.darkClass);
    } else {
    targetElement.classList.remove(themeConfig.darkClass);
    }
};

// --- Critical Initialization ---
// Apply the theme IMMEDIATELY in the <head> before the body renders
applyTheme(getPreference());
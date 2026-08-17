/**
 * Theme Switcher Part 2
 */

// 3. Update the visual state of the 3-way buttons
const updateUI = (activeTheme) => {
    document.querySelectorAll('[data-theme-switch]').forEach(btn => {
    const btnTheme = btn.getAttribute('data-theme-switch');
    btn.setAttribute('aria-pressed', btnTheme === activeTheme);
    });
};

// 4. Function to handle user clicking a button
const setPreference = (theme) => {
    localStorage.setItem(themeConfig.storageKey, theme);
    applyTheme(theme); // applyTheme is accessible globally from the <head> script
    updateUI(theme);
};

// Listen for changes to the OS/System theme setting in real-time
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getPreference() === 'system') {
    applyTheme('system');
    }
});

// Wait for the DOM to load before attaching click events to buttons
window.addEventListener('DOMContentLoaded', () => {
    updateUI(getPreference());

    document.querySelectorAll('[data-theme-switch]').forEach(btn => {
    btn.addEventListener('click', () => {
        const selectedTheme = btn.getAttribute('data-theme-switch');
        setPreference(selectedTheme);
    });
    });
});
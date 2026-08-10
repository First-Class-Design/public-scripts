// FCD Brand Framework
// Version 2.1.1
// Description: Adds parser for Figma JSON color modes (usually dark.json and light.json) and renders them in a grid with copyable HEX values. Also adds context menu for logo with copy/download options.

// Container IDs to use: colors-container, downloads-container
// Requires config.js placed BEFORE this script


document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Global Setup ---
    const config = window.BrandConfig;

    // --- 2. Logo Context Menu ---
    const logoContainer = document.getElementById('logo-container');
    const contextMenu = document.getElementById('logo-context-menu');
    const svgEl = logoContainer.querySelector('svg');

    logoContainer.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        contextMenu.style.left = `${e.pageX}px`;
        contextMenu.style.top = `${e.pageY}px`;
        contextMenu.classList.add('u-menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#logo-context-menu') && !e.target.closest('#logo-container')) {
            contextMenu.classList.remove('u-menu-open');
        }
    });

    document.getElementById('ctx-copy-svg').addEventListener('click', function () {
        const svgCode = svgEl.outerHTML;
        const linkEl = this;
        const originalHTML = linkEl.innerHTML;
        navigator.clipboard.writeText(svgCode).then(() => {
            linkEl.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Copied!
            `;
            setTimeout(() => {
                linkEl.innerHTML = originalHTML;
                contextMenu.classList.remove('u-menu-open');
            }, 1000);
        });
    });

    document.getElementById('ctx-download-svg').addEventListener('click', () => {
        const svgPath = config.logoPath || 'logo.svg';
        const a = document.createElement('a');
        a.href = svgPath;
        a.download = `${config.brandName.toLowerCase()}-logo.svg`;
        a.click();
        contextMenu.classList.remove('u-menu-open');
    });

    document.getElementById('ctx-download-png').addEventListener('click', () => {
        const pngPath = config.logoPngPath || 'logo.png';
        const a = document.createElement('a');
        a.href = pngPath;
        a.download = `${config.brandName.toLowerCase()}-logo.png`;
        a.click();
        contextMenu.classList.remove('u-menu-open');
    });

    // --- 3. Color Tokens Parsing ---
    let tokenData = { light: null, dark: null };
    let currentMode = 'light';

    function processTokens(obj, path = []) {
        let items = [];
        for (const [key, val] of Object.entries(obj)) {
            if (key === '$extensions') continue;
            if (val && val.$type === 'color') {
                items.push({ path: [...path, key], value: val.$value });
            } else if (val && typeof val === 'object' && !Array.isArray(val)) {
                items.push(...processTokens(val, [...path, key]));
            }
        }
        return items;
    }

    function renderColors(mode) {
        const container = document.getElementById('colors-container');
        if (!tokenData[mode]) {
            container.innerHTML = '<div style="color:red">Failed to load tokens for this mode.</div>';
            return;
        }

        const flatTokens = processTokens(tokenData[mode]);

        // Resolve Aliases
        flatTokens.forEach(item => {
            if (typeof item.value === 'string' && item.value.startsWith('{')) {
                const targetKey = item.value.replace(/[{}]/g, '');
                const targetItem = flatTokens.find(x => x.path[0] === targetKey || x.path.join('.') === targetKey);
                item.hex = targetItem && targetItem.value.hex ? targetItem.value.hex : item.value;
            } else if (item.value && item.value.hex) {
                item.hex = item.value.hex;
            } else {
                item.hex = '#000000';
            }
        });

        // Group
        const groups = {};
        flatTokens.forEach(item => {
            const groupName = item.path.length > 1 ? item.path.slice(0, -1).join(' / ') : 'Base Colors';
            if (!groups[groupName]) groups[groupName] = [];
            groups[groupName].push(item);
        });

        let html = '';
        for (const [groupName, items] of Object.entries(groups)) {
            html += `
                <div class="color-group u-mb-large">
                    <h3 class="color-group-title">${groupName}</h3>
                    <div class="grid_5 color-grid">
            `;
            items.forEach(item => {
                const name = item.path[item.path.length - 1];
                const hexUpperCase = (item.hex || '').toUpperCase();
                html += `
                    <div class="card cc-color-swatch" onclick="copyColorHex(this, '${hexUpperCase}')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){copyColorHex(this, '${hexUpperCase}');event.preventDefault();}">
                        <div class="color-preview u-mb-small" style="background-color: ${hexUpperCase};"></div>
                        <div class="color-info">
                            <h3 class="h3 color-name" title="${name}">${name}</h3>
                            <div class="color-hex u-mb-small">${hexUpperCase}</div>
                            <div class="btn-hold u-mt-auto">
                              <div class="master-button cc-white-btn u-medium" aria-hidden="true">
                                <svg width="1.3em" height="1.3em" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M17.5 7.875H9.625C8.6585 7.875 7.875 8.6585 7.875 9.625V17.5C7.875 18.4665 8.6585 19.25 9.625 19.25H17.5C18.4665 19.25 19.25 18.4665 19.25 17.5V9.625C19.25 8.6585 18.4665 7.875 17.5 7.875Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                                  <path d="M4.375 13.125H3.5C3.03587 13.125 2.59075 12.9406 2.26256 12.6124C1.93437 12.2842 1.75 11.8391 1.75 11.375V3.5C1.75 3.03587 1.93437 2.59075 2.26256 2.26256C2.59075 1.93437 3.03587 1.75 3.5 1.75H11.375C11.8391 1.75 12.2842 1.93437 12.6124 2.26256C12.9406 2.59075 13.125 3.03587 13.125 3.5V4.375" stroke="currentColor" stroke-width="2"/>
                                </svg>
                                  Copy HEX
                              </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            html += `</div></div>`;
        }
        container.innerHTML = html;
    }

    window.copyColorHex = function (cardEl, hex) {
        const btn = cardEl.querySelector('.master-button');
        if (!btn) return;

        if (btn._resetTimer) {
            clearTimeout(btn._resetTimer);
        }

        const defaultContent = `
            <svg width="1.3em" height="1.3em" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 7.875H9.625C8.6585 7.875 7.875 8.6585 7.875 9.625V17.5C7.875 18.4665 8.6585 19.25 9.625 19.25H17.5C18.4665 19.25 19.25 18.4665 19.25 17.5V9.625C19.25 8.6585 18.4665 7.875 17.5 7.875Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <path d="M4.375 13.125H3.5C3.03587 13.125 2.59075 12.9406 2.26256 12.6124C1.93437 12.2842 1.75 11.8391 1.75 11.375V3.5C1.75 3.03587 1.93437 2.59075 2.26256 2.26256C2.59075 1.93437 3.03587 1.75 3.5 1.75H11.375C11.8391 1.75 12.2842 1.93437 12.6124 2.26256C12.9406 2.59075 13.125 3.03587 13.125 3.5V4.375" stroke="currentColor" stroke-width="2"/>
            </svg>
            Copy HEX
        `;

        navigator.clipboard.writeText(hex).then(() => {
            btn.classList.remove('u-error');
            btn.classList.add('u-copied');
            btn.innerHTML = `
                <svg width="1.3em" height="1.3em" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                	<path d="M17.5 5.25L7.875 14.875L3.5 10.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Copied!
            `;
            btn._resetTimer = setTimeout(() => {
                btn.classList.remove('u-copied');
                btn.innerHTML = defaultContent;
            }, 1800);
        }).catch(err => {
            console.error("Failed to copy:", err);
            btn.classList.remove('u-copied');
            btn.classList.add('u-error');
            btn.innerHTML = `
                <svg width="1.3em" height="1.3em" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.0137 15.75L12.0137 3.49995C11.8611 3.23063 11.6398 3.00662 11.3723 2.85076C11.1048 2.69491 10.8008 2.61279 10.4912 2.61279C10.1817 2.61279 9.87766 2.69491 9.61019 2.85076C9.34272 3.00662 9.12138 3.23063 8.96875 3.49995L1.96875 15.75C1.81447 16.0171 1.73357 16.3204 1.73426 16.6289C1.73494 16.9374 1.81718 17.2403 1.97264 17.5068C2.1281 17.7733 2.35125 17.994 2.61948 18.1464C2.88771 18.2989 3.19148 18.3777 3.5 18.375H17.5C17.807 18.3746 18.1086 18.2935 18.3744 18.1398C18.6402 17.9861 18.8608 17.7652 19.0142 17.4992C19.1676 17.2332 19.2483 16.9315 19.2482 16.6245C19.2481 16.3175 19.1673 16.0159 19.0137 15.75Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M10.5 7.875V11.375" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <path d="M10.5 14.875H10.5088" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Failed
            `;
            btn._resetTimer = setTimeout(() => {
                btn.classList.remove('u-error');
                btn.innerHTML = defaultContent;
            }, 2000);
        });
    };

    // Fetch Tokens
    async function initTokens() {
        try {
            const [lightRes, darkRes] = await Promise.all([
                fetch(config.tokens.light).catch(() => null),
                fetch(config.tokens.dark).catch(() => null)
            ]);

            if (lightRes && lightRes.ok) tokenData.light = await lightRes.json();
            if (darkRes && darkRes.ok) tokenData.dark = await darkRes.json();

            renderColors(currentMode);
        } catch (e) {
            console.error("Error loading tokens", e);
            document.getElementById('colors-container').innerHTML = 'Failed to load colours.';
        }
    }

    // Toggle Mode
    const modeBtns = document.querySelectorAll('.mode-btn');
    modeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            modeBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentMode = e.target.getAttribute('data-mode');
            renderColors(currentMode);
        });
    });

    // --- 4. Downloads Section ---
    // --- Kept for reference purposes. This section shouldn't be used as it is more efficient to manually do the HTML.
    // --- However, if you want to dynamically generate the downloads section based on an API or CMS data, you can use this function.
    function initDownloads() {
        const container = document.getElementById('downloads-container');
        let html = '';
        config.assets.forEach(asset => {
            const title = asset.title || asset.name;
            const description = asset.description || `Official ${title} brand asset for materials.`;
            const linkText = asset.linkText || `Download ${title}`;
            html += `
                <div class="card">
                    <div class="card_contents">
                        <h2 class="h3">${title}</h2>
                        <p class="u-mb-medium" title="${title}">${description}</p>
                        <div class="btn-hold u-mt-auto">
                            <a href="${asset.file}" download style="text-decoration: none; display: inline-block;">
                                <div class="master-button cc-white-btn u-small">
                                    <div class="btn-text">${linkText}</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    // Initialize all modules
    initTokens();
    initDownloads();

});

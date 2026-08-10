// FCD Brand Framework - Client Config File
// Description: Use this file to config unique options for the brand system.

// All URLs should be on GitHub (except images) or Google Drive for easier updating (https://github.com/First-Class-Design/public-scripts/client).

const BrandConfig = {
    brandName: "Unbreakable",
    logoPath: "assets/logo.svg",
    logoPngPath: "assets/logo.png",
    tokens: {
        light: "tokens/Light.tokens.json",
        dark: "tokens/Dark.tokens.json"
    },

    // Any extra downloads or assets can be configured here
    // Used only if the downloads section is used.
    assets: [
        {
            title: "Logo (SVG)",
            description: "Official Unbreakable SVG logo for digital and print media.",
            linkText: "Download SVG Logo",
            file: "assets/logo.svg"
        },
        {
            title: "Brand Icons",
            description: "Complete package of official brand icon assets and visual guidelines.",
            linkText: "Download Icon Pack",
            file: "assets/brand-icons.zip"
        }
    ]
};

window.BrandConfig = BrandConfig;
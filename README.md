![GitHub Banner](/unbreakable-GitHub-public-scripts.png)
# Public Scripts
Public scripts and code assets to be used via jsDelivr on all projects. This repo is designed to house them all as long they are global and updates will not break support.

Visit [Unbreakable 2.0 Webflow Framework](https://fcd-styleguide.webflow.io/) to see the live version where these scripts are used.

### Notes
- Contains client brand systems as of August 2026. This is powered by FCD Brand System on [code-snippets](https://github.com/First-Class-Design/code-snippets) repo.
- Read timer only works with 1 instance of  `.page_rt` and will require code mods to work with multiple instance (i.e. WF conditional show / hide). WordPress is unaffected due to how PHP removes the HTML altogether.


### Brand System
A JSON file is exported from Figma - this is normally split into multiple JSON files due to vrVariable modes (usually 'light' and 'dark').

### Theme Switcher
Versatile dark / light / system colour mode switcher that stores the preference in the users browser.
- logic-part1.js should go AFTER config.js in the `<head>`
- logic-part2.js should go before `</body>`
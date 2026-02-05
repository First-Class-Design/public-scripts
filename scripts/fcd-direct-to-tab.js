/** 
 * Webflow Tab Navigation Handler
 * Enables direct linking to specific tabs with optional section anchoring
 * @author FCD
 * @version 1.0.0
 */
window.addEventListener('load', function() {
// Extract URL parameters and location hash
const urlParameters = new URLSearchParams(window.location.search);
const targetTabId = urlParameters.get('tab');
const targetSectionId = window.location.hash.slice(1);

// Process tab navigation if tab parameter exists
if (targetTabId) {
    const tabTrigger = document.getElementById(targetTabId);
    
    if (tabTrigger) {
    // Handle combined tab switching and section anchoring
    if (targetSectionId) {
        // Add slight delay to ensure proper tab content rendering
        // before allowing native anchor scrolling
        setTimeout(() => {
        tabTrigger.click();
        }, 50);
    } else {
        // Simple tab switching without section anchoring
        tabTrigger.click();
    }
    }
}
});
/** 
 * GSAP Hide Navigation
 * Adds a class to the navbar when scrolling past a certain point on the page.
 * 
 * Class used: .navbar.u-nav-filled
 * Requires <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js"></script>
 * 
 * Author FCD x Gemini AI
 * Version 1.0.0
 */

// Check if viewport is desktop size
function isDesktopView() {
    return window.innerWidth >= 992; 
}

gsap.registerPlugin(ScrollTrigger);

let navbarScrollTrigger;

// Select your elements
const navbarElement = document.querySelector('.navbar');
const stickyNavElement = document.querySelector('.sticky_navigation');

// 3. Function to initialize the scroll animation
function initNavbarScrollAnimation() {
    // Only initialize if we are on desktop AND the trigger doesn't already exist
    if (isDesktopView() && !navbarScrollTrigger && navbarElement) {

        // We create a ScrollTrigger that watches the whole page
        navbarScrollTrigger = ScrollTrigger.create({
            start: "top top", // Start tracking immediately
            end: 99999,       // Effectively track the whole page height

            // onUpdate fires every time a scroll event happens within the start/end range
            onUpdate: (self) => {
                // self.direction is 1 for scrolling down, -1 for scrolling up

                if (self.direction === 1) {
                    // Scrolling DOWN: add classes to hide navbar and shift sticky nav
                    navbarElement.classList.add('navbar-hidden');
                    if (stickyNavElement) stickyNavElement.classList.add('sticky-shifted');
                } else if (self.direction === -1) {
                    // Scrolling UP: remove classes to show navbar and reset sticky nav
                    navbarElement.classList.remove('navbar-hidden');
                    if (stickyNavElement) stickyNavElement.classList.remove('sticky-shifted');
                }
            }
        });
    }
}

// 4. Function to clean up the animation on smaller screens
function destroyNavbarScrollAnimation() {
    if (navbarScrollTrigger) {
        // Remove the classes just in case they were applied when resizing occurred
        if (navbarElement) {
            navbarElement.classList.remove('navbar-hidden');
        }
        if (stickyNavElement) {
            stickyNavElement.classList.remove('sticky-shifted');
        }

        navbarScrollTrigger.kill(); // Destroy the ScrollTrigger instance
        navbarScrollTrigger = null; // Reset the variable
    }
}

// 5. Handle window resize events to turn features on/off responsively
window.addEventListener('resize', () => {
    if (!isDesktopView()) {
        destroyNavbarScrollAnimation();
    } else {
        initNavbarScrollAnimation();
    }
});

// 6. Initial call to set things up when the page loads
initNavbarScrollAnimation();
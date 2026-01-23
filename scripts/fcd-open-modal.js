// Created by FIrst Class Design Ltd. Handcrafted with prompts using Gemini AI.
// Poloyfill
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dialog-polyfill/0.5.6/dialog-polyfill.min.css" />
// <script src="https://cdnjs.cloudflare.com/ajax/libs/dialog-polyfill/0.5.6/dialog-polyfill.min.js"></script>

// All rights reserved.

document.addEventListener("DOMContentLoaded", () => {
  // Get all dialog elements
  const dialogs = document.querySelectorAll("dialog");

  dialogs.forEach((dialog) => {
    // --- OLD BROWSER SUPPORT ---
    // Registers the dialog with the polyfill if the browser doesn't support <dialog> natively
    // Note: You must include the dialog-polyfill CSS and JS in your project for this to work.
    if (!dialog.showModal && typeof dialogPolyfill !== "undefined") {
      dialogPolyfill.registerDialog(dialog);
    }

    // --- OPEN TRIGGER ---
    // Finds the button immediately following the dialog (matches original "dialog + button" logic)
    const openBtn = dialog.nextElementSibling;
    
    // Check if the next element exists and is actually a button
    if (openBtn && openBtn.matches("button")) {
      openBtn.addEventListener("click", () => {
        dialog.showModal();
      });
    }

    // --- CLOSE TRIGGERS (Primary & Secondary) ---
    // specific selectors for closing buttons INSIDE this specific dialog
    // You can now add the class .modal_close-secondary to a secondary button (like "Cancel")
    const closeButtons = dialog.querySelectorAll(".modal_close-button, .modal_close-secondary");
    
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        dialog.close();
      });
    });

    // --- BACKDROP CLICK ---
    // Close the dialog when clicking on the backdrop (outside the dialog box)
    dialog.addEventListener("click", (e) => {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.close();
      }
    });
  });
});
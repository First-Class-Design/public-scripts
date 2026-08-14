/** 
 * Capture page URL
 * Captures current URL and populates a hidden field in forms on the page.
 * 
 * 
 * Author FCD
 * Version 1.0.0
 */

// Capture Page URL and fill a hidden field
	document.addEventListener("DOMContentLoaded", function(event) { 
  // get & store the page url in a variable
  const url = location.href;	
  // set the page url as the hidden input's value
  $('#pageurl').val(url);
  
  // show the page url as text on the page
  // this last line is only used as a visual
  $('.show-page-url').text(url);
});

/* Copy URL */
const linkCopy = document.getElementById('copy-url');
linkCopy.addEventListener("click", copyURL);
  function copyURL() {
    let url = document.location.href;
    const popup = document.getElementById('site_notice_success');
    const error = document.getElementById('site_notice_error');
    navigator.clipboard.writeText(url).then(function() {
      popup.classList.add('show');
      setTimeout(() => {popup.classList.remove('show');}, 3200);
    }, function() {
      error.classList.add('show');
      setTimeout(() => {error.classList.remove('show');}, 3200);
    });
  }
/* Copy URL */
const linkCopy = document.querySelector('.share_link');
linkCopy.addEventListener("click", copyURL);
  function copyURL() {
    let url = document.location.href;
    const popup = document.querySelector('.site_notice.u-success');
    const error = document.querySelector('.site_notice.u-error');
    navigator.clipboard.writeText(url).then(function() {
      popup.classList.add('show');
      setTimeout(() => {popup.classList.remove('show');}, 3200);
    }, function() {
      error.classList.add('show');
      setTimeout(() => {error.classList.remove('show');}, 3200);
    });
  }
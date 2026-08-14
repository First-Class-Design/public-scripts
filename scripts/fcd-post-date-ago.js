/** 
 * Post Date Ago
 * Converts a date to a "time ago" string (e.g., 5 minutes ago, 2 hours ago)
 * 
 * Author FCD x Reece Chan
 * Version 1.0.0
 */

// Function to pluralize the time past (eg. minute or minutes / day or days)
  const pluralize = (count, noun, suffix = 's') => `${count} ${noun}${count !== 1 ? suffix : ''}`;

  const timePast = (curr, prev) => {
    const msMin = 60 * 1000, msHr = msMin * 60, msDay = msHr * 24, msWeek = msDay * 7, msMonth = msDay * 30, msYr = msDay * 365;
    let elapsed = curr - prev;

    if (elapsed < msMin) return pluralize(Math.round(elapsed/1000), 'second');
    else if (elapsed < msHr) {
      elapsed = Math.round(elapsed/msMin);
      return pluralize(elapsed, 'minute');
    }
    else if (elapsed < msDay) {
      elapsed = Math.round(elapsed/msHr);
      return pluralize(elapsed, 'hour');
    }
    else if (elapsed < msWeek) {
        elapsed = Math.round(elapsed/msDay);
        return pluralize(elapsed, 'day');
    }
    else if (elapsed < msMonth) {
      elapsed = Math.round(elapsed/msWeek);
      return pluralize(elapsed, 'week'); 
    }
    else if (elapsed < msYr) {
      elapsed = Math.round(elapsed/msMonth);
      return pluralize(elapsed, 'month');
    }
    else {
      elapsed = Math.round(elapsed/msYr);
      return pluralize(elapsed, 'year');
    }
  }

  let now = new Date();

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.u-post-date-ago').forEach(box => { // Class name of the element that contains the date to be converted to "time ago"
        let parsedTime = Date.parse(box.innerText);
        box.innerText = timePast(now, new Date(parsedTime)) + ' ago';
    })
})

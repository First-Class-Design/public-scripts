function timePast(curr, prev) {
    //define the milliseconds in every time unit
    var msMin = 60 * 1000;
    var msHr = msMin * 60;
    var msDay = msHr * 24;
    var msWeek = msDay * 7;  
    var msMonth = msDay * 30;
    var msYr = msDay * 365;
    //get elapsed time in milliseconds
    var elapsed = curr - prev;

    if (elapsed < msMin) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msHr) {
        var elapsed = Math.round(elapsed / msMin);
        if (elapsed === 1) {            
            return elapsed + ' minute ago';
        } else {
            return elapsed + ' minutes ago';
        }
    } else if (elapsed < msDay) {
        var elapsed = Math.round(elapsed / msHr);
        if (elapsed === 1) {
            return elapsed + ' hour ago';
        } else {
            return elapsed + ' hours ago';
        }
    } else if (elapsed < msWeek) {
        var elapsed = Math.round(elapsed / msDay);
        if (elapsed === 1) {
            return elapsed + ' day ago';
        } else {
            return elapsed + ' days ago';
        }
    } else if (elapsed < msMonth) {
        var elapsed = Math.round(elapsed / msWeek);
        if (elapsed === 1) { // Check for week
            return elapsed + ' week ago';
        } else {
            return elapsed + ' weeks ago';
        }
    } else if (elapsed < msYr) {
        var elapsed = Math.round(elapsed / msMonth);
        if (elapsed === 1) {
            return elapsed + ' month ago';
        } else {
            return elapsed + ' months ago';
        }
    } else {
        var elapsed = Math.round(elapsed / msYr);
        if (elapsed === 1) {
            return elapsed + ' year ago';
        } else {
            return elapsed + ' years ago';
        }
    }
}
$(document).ready(function () {
    $('.u-post-date').each(function () {
        var now = new Date();
        var parsedTime = Date.parse($(this).text());
        $(this).text(timePast(now, new Date(parsedTime)));
    });
});
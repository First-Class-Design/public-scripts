dayjs.extend(window.dayjs_plugin_toObject);
dayjs.extend(window.dayjs_plugin_timezone);
dayjs.extend(window.dayjs_plugin_utc); 
// Pulls the DayJS plugins.

// Defines all connected elements
const clock1 = document.getElementById('phoenix-us');
const clock2 = document.getElementById('guadalajara-mexico');
const clock3 = document.getElementById('london-uk');
const clock4 = document.getElementById('gurgaon-india');
const clock5 = document.getElementById('bangalore-india');
const clock6 = document.getElementById('yokohama-japan')
const statUs = document.getElementById('status-us');
const statMx = document.getElementById('status-mx');
const statUk = document.getElementById('status-uk');
const statIn1 = document.getElementById('status-in1');
const statIn2 = document.getElementById('status-in2');
const statJp = document.getElementById('status-jp');

function updateTime() {
  // Used to display the time on the page.
  var timezoneUk = dayjs().tz("Europe/London").format('HH:mm'); // UK Timezone
  var timezoneIndia = dayjs().tz("Asia/Kolkata").format('HH:mm'); // India Timezone
  var timezoneMex = dayjs().tz("America/Mexico_City").format('HH:mm'); // Mexico Timezone
  var timezoneUs = dayjs().tz("America/Phoenix").format('HH:mm'); // Phoenix, America Timezone
  var timezoneJp = dayjs().tz("Asia/Tokyo").format("HH:mm"); // Japan Timezone

  // Sets all timezones into Objects.
  var tzUkObj = dayjs().tz("Europe/London").toObject(); // UK Timezone
  var tzIndiaObj = dayjs().tz("Asia/Kolkata").toObject(); // India Timezone
  var tzMexObj = dayjs().tz("America/Mexico_City").toObject(); // Mexico Timezone
  var tzUsObj = dayjs().tz("America/Phoenix").toObject(); // Phoenix, America Timezone
  var tzJpObj = dayjs().tz("Asia/Tokyo").toObject(); // Japan Timezone
  
  //Rewrites all clock divs on the page to the listed timezones above.
  clock1.innerHTML = timezoneUs;
  clock2.innerHTML = timezoneMex;
  clock3.innerHTML = timezoneUk;
  clock4.innerHTML = timezoneIndia;
  clock5.innerHTML = timezoneIndia;
  clock6.innerHTML = timezoneJp;
  
  // Sets a "Status" property on all of the objects for conditionals below.
  var timeObject = [tzUkObj, tzIndiaObj, tzMexObj, tzUsObj, tzJpObj];
  timeObject.forEach(obj => {
    Object.defineProperty(obj, "status", {value:"closed", enumerable:"true", writable:"true"});
  });
  
  // Closing times with minute values need a separate condition.
  // 17:30 UK closing time condition.
  let ukClosing = false;
  if (tzUkObj.hours === 17 && tzUkObj.minutes >= 30) {
  ukClosing = true;
  } else if (tzUkObj.hours >= 18) {ukClosing = true;} 
  else {ukClosing = false;} 
  // 17:30 Mexico closing time condition.
  let mexClosing = false;
  if (tzMexObj.hours === 17 && tzMexObj.minutes >= 30) {
  mexClosing = true;
  } else if (tzMexObj.hours >= 18) {mexClosing = true;} 
  else {mexClosing = false;} 
  // 15:30 Japan closing time condition.
  let jpClosing = false;
  if (tzJpObj.hours === 15 && tzJpObj.minutes >= 30) {
    jpClosing = true;
  } else if (tzJpObj.hours >= 16) {jpClosing = true;}
  else {jpClosing = false;}
 
  // UK office opening hours
  if (tzUkObj.hours >= 7 && ukClosing === false) {tzUkObj.status = "open";}
  //India office opening hours
  if (tzIndiaObj.hours >= 10 && tzIndiaObj.hours < 18) {
    tzIndiaObj.status = "open";
  } else {tzIndiaObj.status = "closed";}
  // Mexico office opening hours
  if (tzMexObj.hours >= 9 && mexClosing === false) {
    tzMexObj.status = "open";
  } else {tzMexObj.status = "closed";}
  // US office opening hours
  if (tzUsObj.hours >= 7 && tzUsObj.hours < 16) {
    tzUsObj.status = "open";
  } else {tzUsObj.status = "closed";}
  // Japan office opening hours
  if (tzJpObj.hours >= 9 && jpClosing === false) {
    tzJpObj.status = "open";
  } else {tzJpObj.status = "closed";}
   
  // Updates the status divs on the page to display whether the location is open or not based on the object properties.
  if (tzUkObj.status === "open") {
    statUk.innerHTML = "Open";
  } else {
    statUk.innerHTML = "Closed";
  }
  if (tzIndiaObj.status === "open") {
    statIn1.innerHTML = "Open";
    statIn2.innerHTML = "Open";
  } else {
    statIn1.innerHTML = "Closed";
    statIn2.innerHTML = "Closed";
  }
  if (tzMexObj.status === "open") {
    statMx.innerHTML = "Open";
  } else {
    statMx.innerHTML = "Closed";
  }
  if (tzUsObj.status === "open") {
    statUs.innerHTML = "Open";
  } else {
    statUs.innerHTML = "Closed";
  }
  if (tzJpObj.status === "open") {
    statJp.innerHTML = "Open";
  } else {
    statJp.innerHTML = "Closed";
  }
  document.querySelectorAll('.map-status').forEach(statEl=> {
    const tooltip = statEl.closest('.map-tooltip');
    if (statEl.innerHTML === "Open") {
      statEl.style.color = "var(--_themes---colours--primary)";
      statEl.style.fontWeight = "700";
      tooltip.previousElementSibling.style.backgroundColor = "var(--_themes---colours--primary)";
    } else {
      statEl.style.color = "rgba(0,0,0,0.4)";
      tooltip.previousElementSibling.style.backgroundColor = "var(--_themes---support--support-2)";
    }
  });
}

setInterval(updateTime, 1000); // Runs the function indefinitely every 1 second.
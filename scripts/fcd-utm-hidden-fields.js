var queryString = window.location.search;
console.log(queryString);
// ?utm_source=XXXXX&utm_medium=post&utm_campaign=yourname&utm_term=keyword,keyword+two&utm_content=text+ad.footer+link
// Fathom Analytics has a fantastic guide. See: https://usefathom.com/blog/utms
var URLSearchParams_wb = new URLSearchParams(queryString);

const utmParameters = [
  "utm_source", // Class name of input field.
  "utm_medium", // Class name of input field.
  "utm_campaign", // Class name of input field.
  "utm_term", // Class name of input field.
  "utm_content" // Class name of input field.
];


for (const utm_element of utmParameters) {
  /* if utm_source exist */
  $( "form" ).each(function( index ) {
    if(URLSearchParams_wb.has(utm_element)){
      console.log(utm_element + "is exist");
      /* get UTM value of this utm param */
      var value = URLSearchParams_wb.get(utm_element)
      /* change form hidden feild to this utm url value */
      $( this ).find("."+utm_element).val(value);
    }

  })
}/* end for loop */
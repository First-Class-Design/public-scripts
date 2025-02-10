// Removes and adds classes to the navbar when transparency is needed.
// .navbar.u-nav-filled 
// Requires <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js"></script>

$("#navbar-default-trigger").each(function (index) { //The first item on the page where the class u-nav-filled is removed.
    ScrollTrigger.create({
      trigger: $(this),
      start: "top 10%",
      end: "bottom 10%",
      onEnter: () => {
        $(".navbar").removeClass("u-nav-filled"); //css color transition required and background-color css property
      },
      onEnterBack: () => {
        $(".navbar").removeClass("u-nav-filled"); //css color transition required and background-color css property
      }
    });
  });

  $("#navbar-trigger").each(function (index) { //The second item on the page where the class u-nav-filled is removed.
    ScrollTrigger.create({
      trigger: $(this),
      start: "top 10%",
      end: "bottom 10%",
      onEnter: () => {
        $(".navbar").addClass("u-nav-filled"); //css color transition required and background-color css property
      },
      onEnterBack: () => {
        $(".navbar").addClass("u-nav-filled"); //css color transition required and background-color css property
      }
    });
  });
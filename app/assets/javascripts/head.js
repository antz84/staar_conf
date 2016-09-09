$(document).ready(function(){
    $('.scrollspy').scrollSpy();
    openNav();
  });

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    $("#mySideNav").addClass("sideNav");
    // document.querySelector(".container").style.marginLeft = "20%";
    $("#bodyDiv").addClass("screenContainerBig");
}

//========= this is not needed anymore as our nav bar is fixed
/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
// function closeNav() {
//     document.getElementById("mySidenav").style.width = "0";
//     document.getElementById("main").style.marginLeft = "0";
// }

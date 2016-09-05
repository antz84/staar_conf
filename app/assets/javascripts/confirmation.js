$(document).ready(function() {

  $( "#book-btn" ).click(function(event) {
    $('.button-collapse').sideNav('hide');
  });

  $( "#pay-btn" ).click(function(event) {
    console.log("total:" + total);
    $('.button-collapse').sideNav('hide');
  });

});

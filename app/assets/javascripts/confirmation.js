$(document).ready(function() {

  $( "#book-btn" ).click(function(event) {
    $('.button-collapse').sideNav('hide');
  });

  $( "#pay-btn" ).click(function(event) {
    $('.button-collapse').sideNav('hide');
  });

  console.log(ticketBox.getTotal());
});

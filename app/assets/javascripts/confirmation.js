$(document).ready(function() {

  $( "#book-btn" ).click(function(event) {
    $('.button-collapse').sideNav('hide');
  });

  $( "#pay-btn" ).click(function(event) {
    $totalPrice = $('.total-price');
    $totalPrice.val(total);
    $('.button-collapse').sideNav('hide');
  });

});

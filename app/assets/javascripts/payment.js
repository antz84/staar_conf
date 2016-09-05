$(function() {
  var $form = $('#payment-form');
  $form.submit(function(event) {
    // Disable the submit button to prevent repeated clicks:
    $form.find('.submit').prop('disabled', true);

    // Request a token from Stripe:
    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from being submitted:
    return false;
  });
});

function stripeResponseHandler(status, response) {
  // Grab the form:
  var $form = $('#payment-form');

  if (response.error) { // Problem!

    // Show the errors on the form:
    $form.find('.payment-errors').text(response.error.message);
    $form.find('.submit').prop('disabled', false); // Re-enable submission

  } else { // Token was created!

    // Get the token ID:
    var token = response.id;

    var amount = $("#total").val();
    var first_name = $("#first_name").val();
    var last_name = $("#last_name").val();
    var email = $("#email").val();
    // $form.get(0).submit();

    $.ajax({
      type:"POST",
      url:"http://localhost:3000/api/charges",
      data:{token_ : token, amount_ : amount, first_name : first_name, last_name: last_name, email : email}
    }).done(function(res){
      console.log(res);
      var $paymentForm = $(".payment-container").detach();
      // var $paymentDiv = $('<div>', {class: "payment-container"});
      var $confirmation = $('<h3>').text("Confirmation");
      var $paymentSuccess = $('<h4>').text("Payment Successful");
      var $emailed = $('<h4>').text("Your tickets have been emailed to you.");
      var $seeYou = $('<h4>').text("See you there!");
      var $button = $('<button>', {id: "home-btn"}).text("Home");

      // $("#payment").append($paymentDiv);
      $("#payment").append($confirmation);
      $("#payment").append($paymentSuccess);
      $("#payment").append($emailed);
      $("#payment").append($seeYou);
      $("#payment").append($button);

      $( "#home-btn" ).click(function(event) {
        $('.button-collapse').sideNav('hide');
        $("#payment").empty();
        $paymentForm.appendTo( "#payment" );
        $form.find('.submit').prop('disabled', false);
        window.scrollTo(0, 0);
      });

    });
  }
}

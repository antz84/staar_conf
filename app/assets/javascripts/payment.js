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

  if (response.error) {
    // Show the errors on the form:
    $form.find('.payment-errors').text(response.error.message);
    $form.find('.submit').prop('disabled', false); // Re-enable submission

  } else {
    // Get the token ID:


    var firstname = $form.find('#first_name').val();
    var surname = $form.find('#last_name').val();
    var email_ = $form.find('#email').val();

    var token_ = response.id;
    var amount_ = exported.getTotal();
    var alltickets = exported.getAllTickets();
    console.log(amount_);
    console.log(token_);
    console.log(exported.toString());

    $.ajax({
      type:"POST",
      url:"http://localhost:3000/api/charges",
      data:{token : token_,
            amount : amount_,
            info : { fname : firstname,
                     sname : surname,
                     email : email_,
                     tickets : alltickets
                   }
          }

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

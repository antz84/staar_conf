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

    var firstname = $form.find('#first-name').val();
    var surname = $form.find('#surname').val();
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
      console.log(JSON.stringify(res));
      //clear everything and show payment confirmed page

    });
  }
}

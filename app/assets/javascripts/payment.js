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

    // Insert the token ID into the form so it gets submitted to the server:
    // $form.append($('<input type="hidden" name="stripeToken">').val(token));

    // Submit the form:
    // console.log($form.get(0));
    // console.log($("#cardNo").val());
    // console.log($("#exp_m").val());
    // console.log($("#cvc").val());
    var amount = $("#total").val();
    var first_name = $("#first_name").val();
    var last_name = $("#last_name").val();
    var email = $("#email").val();
    // $form.get(0).submit();
    // ajax

    $.ajax({
      type:"POST",
      url:"http://localhost:3000/api/charges",
      data:{token_ : token, amount_ : amount, first_name : first_name, last_name: last_name, email : email}
    }).done(function(res){
      console.log(res);
      $(".payment-container").detach();
      



      // console.log(JSON.stringify(res));
      //clear everything and show payment confirmed page

    });
  }
}

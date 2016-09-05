class ChargesController < ApplicationController

  def new
  end

  def create
    # Set your secret key: remember to change this to your live secret key in production
    # See your keys here: https://dashboard.stripe.com/account/apikeys
    Stripe.api_key = "sk_test_BQokikJOvBiI2HlWgH4olfQ2"

    # Get the credit card details submitted by the form
    token = params[:stripeToken]

    # Create a charge: this will charge the user's card
    begin
      charge = Stripe::Charge.create(
        :amount => 1000, # Amount in cents
        :currency => "usd",
        :source => token,
        :description => "Example charge"
      )
      rescue Stripe::CardError => e
      # The card has been declined
    end
    
    redirect_to '/'
  end


end

# when Pay button is pressed, I want to:
# - ajax function that sends the amount object to the sever(?)
# - get the amount from ray's amount object
# - replace it with the amount in the create method
# - process the payment, update the db, send the email, and send response back.
# - when response comes back, ajax kicks in and goes to the confirmation page.

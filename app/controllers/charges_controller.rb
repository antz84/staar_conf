class ChargesController < ApplicationController

  def new
  end

  def create
    total_price = ((params[:totalPrice].to_i * 100) + 1000) # need to change this later.

    # Set your secret key: remember to change this to your live secret key in production
    # See your keys here: https://dashboard.stripe.com/account/apikeys
    Stripe.api_key = "sk_test_BQokikJOvBiI2HlWgH4olfQ2"

    # Get the credit card details submitted by the form
    token = params[:stripeToken]

    # Create a charge: this will charge the user's card
    begin
      charge = Stripe::Charge.create(
        :amount => total_price, # Amount in cents
        :currency => "usd",
        :source => token,
        :description => "Example charge"
      )
      rescue Stripe::CardError => e
      # The card has been declined
    end
    render json:{pay_msg: "success"}

  end

end

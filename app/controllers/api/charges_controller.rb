module Api

  class ChargesController < ApplicationController

    def new
    end

    def create
      # Set your secret key: remember to change this to your live secret key in production
      # See your keys here: https://dashboard.stripe.com/account/apikeys
      Stripe.api_key = "sk_test_BQokikJOvBiI2HlWgH4olfQ2"

      # Get the credit card details submitted by the form
      token = params[:token_] + "1"
      amount = params[:amount_].to_i * 100

      # Create a charge: this will charge the user's card
      begin
        charge = Stripe::Charge.create(
          :amount => amount, # Amount in cents
          :currency => "usd",
          :source => token,
          :description => "Example charge"
        )
        rescue Stripe::CardError => e
        # The card has been declined
      end
      render json: {message: "Success!"}

    end

  end
end

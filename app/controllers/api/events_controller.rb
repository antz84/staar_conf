module Api

  class EventsController < ApplicationController

    def list_events
      events = Event.all
      render json: events
    end

  end

end

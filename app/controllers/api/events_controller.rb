module Api

  class EventsController < ApplicationController

    def list_events
      events = Event.all
      render json: events
    end

  end

end

# Location.group(:city, :province, :country)
#         .select(:city, :province, :country, "SUM(images_girl_count) as sum_images_count")
#         .order("sum_images_count DESC")
#         .collect{ |location| [location.city, location.province, location.country, location.sum_images_count] }

# events = Event.select("events.*, hobbies.sport, hobbies.image_url as hobby_image_url").joins(:hobby).where("hobby_id=#{params[:sport]}")
#  Event.select("events.*, tickets.*").joins(:ticket).where("tickets.event_id = events.id");
# Location.select(:city, :province, :country, "SUM(images_count) as sum_images_count").group(:city, :province, :country).order("sum_images_count DESC")
# Ticket.select("sum(number)").group(:event_id)
# select e.*, e.seats-sum(t.number) from events e, tickets t where e.id = t.event_id group by t.event_id, e.id;

# select e.id, t.event_id, sum(t.number) from events e, ticket t where e.id = t.event_id group by t.event_id;
# select e.*, e.seats-sum(t.number) from events e, tickets t where e.id = t.event_id group by t.event_id, e.id;
# select * from events left outer join tickets on (events.id = tickets.event_id);
# select * from events left outer join tickets on (events.id = tickets.event_id);
# select * from (select id, topic, price, seats from events) a left outer join (select number, event_id from tickets) b
# on (a.id = b.event_id) group by id;
# select id, sum(number) from (select id, topic, price, seats from events) a left outer join (select number, event_id from tickets) b
# on (a.id = b.event_id) group by a.id, b.number;
#

# select id, topic, price, COALESCE(seats - sum(number),seats) as seats from (select id, topic, price, seats from events) a left outer join (select number, event_id from tickets) b
# on (a.id = b.event_id) group by a.id, b.number, seats, topic, price;
#
# table1 = Event.select(:id, :topic, :price, :seats)
# table2 = Ticket.select(:number, :event_id)
#
# (Event.select(:id, :topic, :price, :seats)).joins("left outer join (select number, event_id from tickets) on (events.id = tickets.event_id)")
# Event.joins("left outer join (select number, event_id from tickets) on (events.id = tickets.event_id)")
# Event.joins("left outer join tickets on events.id = tickets.event_id").all
# Ticket.joins("left outer join events on events.id = tickets.event_id")
# Event.left_outer_joins(:tickets)

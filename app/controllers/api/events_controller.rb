module Api

  class EventsController < ApplicationController

    def list_events
      events = Event.left_outer_joins(:tickets).select("events.id, events.topic, events.price, events.session_time, COALESCE(events.seats - sum(tickets.number),events.seats) as seats").group("events.id, events.topic, events.price, events.session_time, events.seats")
      # events = Event.left_outer_joins(:tickets).select("events.id, events.topic, events.price, events.seats, tickets.event_id ,tickets.number")
      render json: events
    end

  end

end

# Event.left_outer_joins(:tickets).
# select("events.id, events.topic, events.price, COALESCE(events.seats - sum(tickets.number),events.seats) as seats,tickets.number")
# .group("events.id, events.topic, events.price, events.seats, tickets.number")
#
# COALESCE(seats - sum(number),seats) as seats
# [{"id":7,"topic":"Handling Asycn","price":25,"seats":20,"event_id":7,"number":3},
#   {"id":8,"topic":"Js Callbacks","price":20,"seats":15,"event_id":8,"number":10},
#   {"id":9,"topic":"Web sockets","price":29,"seats":15,"event_id":9,"number":6},
#   {"id":7,"topic":"Handling Asycn","price":25,"seats":20,"event_id":7,"number":3},
#   {"id":10,"topic":"Js closure","price":12,"seats":50,"event_id":null,"number":null}]

# events = Event.left_outer_joins(:tickets).select("events.id, events.topic, events.price,events.seats,tickets.event_id,tickets.number")

# # {"id":1,
# "topic":"Handling Asycn",
# "price":25,"
# seats":20,
# "created_at":"2016-09-04T04:12:07.219Z","updated_at":"2016-09-04T04:12:07.219Z",
# "number":3,
# "firstname":"Ray",
# "surname":"X",
# "email":"1@23.com",
# "event_id":7}
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

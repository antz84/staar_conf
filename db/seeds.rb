# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


t1 = Event.new()
t1.topic = "Handling Asycn"
t1.price = 25
t1.seats = 20
t1.save

t2 = Event.new()
t2.topic = "Js Callbacks"
t2.price = 20
t2.seats = 15
t2.save

t3 = Event.new()
t3.topic = "Web sockets"
t3.price = 29.99
t3.seats = 15
t3.save

#
# number     | integer                     |
# firstname  | character varying           |
# surname    | character varying           |
# email      | character varying           |
# event_id   | integer                     |
#
# p1 = Ticket.new()
# p1.number = 3
# p1.firstname = 'Ray'
# p1.surname = 'X'
# p1.email = '1@23.com'
# p1.event_id = 7
# p1.save
#
# p2 = Ticket.new()
# p2.number = 10
# p2.firstname = 'Ray'
# p2.surname = 'X'
# p2.email = '1@23.com'
# p2.event_id = 8
# p2.save
#
# p3 = Ticket.new()
# p3.number = 6
# p3.firstname = 'Ray'
# p3.surname = 'X'
# p3.email = '1@23.com'
# p3.event_id = 9
# p3.save

# p4 = Ticket.new()
# p4.number = 3
# p4.firstname = 'Ray'
# p4.surname = 'X'
# p4.email = '1@23.com'
# p4.event_id = 7
# p4.save
# rails g migration add_session_time_to_dishes user_id:integer

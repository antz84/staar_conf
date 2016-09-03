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

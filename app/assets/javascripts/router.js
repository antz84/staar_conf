

  var Router = Backbone.Router.extend({

      routes: {
        'bookings': 'listTalks'           // #bookings view
        // '': 'listTalks'                // #
      },

      listTalks: function() {
      $.ajax({
        type: "GET",
        url: 'http://localhost:3000/api/events'
      }).done(
        function(res) {
          res.forEach(function(talk) {
            var talksView = new TalksIndexView();
            // $('.main').append(talksView.render(talk).el);
          });
        });
      }
  });






// var TalksIndexView = Backbone.View.extend({
//
//   template: _.template($('#talks-index-template').html()),
//
//   events: {} ,
//
//   render: function (res) {
//       this.$el.html(this.template({talks: res }));
//       return this.el;}
// });

// var EventsIndexView = Backbone.View.extend({
//
//   template: _.template($('#talks-index-template').html()),
//
//   events: {} ,
//
//   render: function (res) {
//       this.$el.html(this.template({talks: res }));
//       return this.el;}
// });

var Router = Backbone.Router.extend({

    routes: {
      'bookings': 'listTalks',           // #bookings view
      // '': 'listTalks'                // #
    },

    listTalks: function() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:3000/api/talks'
    }).done(
      function(res) {
        console.log(res);
        var talksView = new TalksIndexView();
        $('.main').html(talksView.render(res));
      });
    }
});


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

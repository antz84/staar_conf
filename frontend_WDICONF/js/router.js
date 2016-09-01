var Router = Backbone.Router.extend({

  routes: {
    'bookings': 'index',           // #bookings
    '': 'index'                // #
  },

  displayView: function (view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;
    $('.main').html(this.currentView.render());
  },

  index: function () {
    var self = this;
    talks.view = new EventsIndexView({collection: talks});
      self.displayView(talks.view);
  }
});

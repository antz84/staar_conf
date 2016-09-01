var Talk = Backbone.Model.extend({

  initialize: function () {
    this.on('sync', function () {
      router.navigate('bookings', {trigger: true});
    });
    this.on('destroy', function () {
      router.navigate('');
    });
  }
});

Talks = Backbone.Collection.extend({

  model: Talk,

  url: 'http://localhost:3000/api/talks'
});

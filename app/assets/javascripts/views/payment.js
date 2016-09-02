var Movie = Backbone.Model.extend({
});

var movie = new Movie({ title: 'jaws 3d', year: 1234});
var movie2 = new Movie({ title: 'once', year: 2345 });
// movie.set('title', 'jaws 3d');

var CardView = Backbone.View.extend({

  tagName: 'div',
  className: 'card',

  events: {
    'click .year': 'doSomething',
    'click h1': 'close'
  },

  template: $('#card-template').html(),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
  },

  close: function() {
    this.$el.hide();
  },

  doSomething: function() {
    console.log(this.model.get('title'));
  },

  render: function() {
    // this.$el.html('<h1>'+ this.model.get('title') +'</h1><h3 class="year">' + this.model.get('year') +'</h3>' );

    // var template = Handlebars.compile( this.template )
    this.$el.html( '<h2>sdfsdf</h2>'  )
    return this;
  }

});

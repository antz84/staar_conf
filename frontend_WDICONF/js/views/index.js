EventsIndexView = Backbone.View.extend({

  template: _.template($('#events-index-template').html()),

  render: function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/api/talks"
    }).done(function (res) {
      this.$el.html(this.template({talks: res }));
      return this.el;
    });
  }
});

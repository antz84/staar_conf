


  var TalksIndexView = Backbone.View.extend({

    events: {} ,

    template: $('#event-template').html(),

    render: function(talk) {
      // console.log($('#event-template').html() + "Before ");
      var template = Handlebars.compile( $('#event-template').html() );
      // var template = Handlebars.compile( this.template ); //this.template = undefined
      this.$el.html( template( talk ) );
      return this;
    }

  });



$(document).ready(function() {

  var ticketBox;
  var priceTotal = 0;

  getTalks(createTicketBoard, shoppingCart);

  function getTalks(render, pool) {

    $.ajax({
      type: "GET",
      url: 'http://localhost:3000/api/events'
    }).done(
      function(res){ ticketBox = pool(res); render(res);
        console.log(ticketBox.toString());
      }
    );

  }

  function createTicketBoard( talks ) {
    // generate a section for each talk
    var $talkList = $('<div>', {class: 'talk-list'});
    var $pricePanel = $('<div>', {class: 'pricePanel'}).text("$" + 0);

    talks.forEach(
      function (talk){
        // element generation
        var $talk = $('<div>', {class: "talk"}).data('id', talk.id);
          var $topic = $('<div>', {class: 'topic'}).text(talk.topic);
          var $price = $('<div>', {class: 'price'}).text("$" + talk.price);
          var $seats = $('<div>', {class: 'seats'}).text("? seats left");
          var $ticketForm = $('<div>', {class: 'ticketForm'});
            var $ticketQty = $('<input>', {class: 'ticketQty', type: 'text', value: 0});
            var $minusBtn = $('<button>', {class: 'minus'}).text("-");
            var $plusBtn = $('<button>', {class: 'plus'}).text("+");

        // appending
        $ticketForm.append($ticketQty);
        $ticketForm.append($minusBtn);
        $ticketForm.append($plusBtn);

        $talk.append($topic);
        $talk.append($price);
        $talk.append($seats);
        $talk.append($ticketForm);

        $talkList.append($talk)

      }
    );

    $('.ticketing').append($talkList);
    $('.ticketing').append($pricePanel);

    //event bundling
    $('.minus').on('click', function(event) {
      var $qty = $(event.target).closest('.ticketForm').find('.ticketQty');
      var currentQty = Number($qty.val());
      console.log($qty.val());
      if(currentQty !== 0) {
        $qty.val(currentQty-1);
        updateTotal();
        // debugger
      }else{
        updateTotal();
      }
    });

    $('.plus').on('click', function(event) {
      var $qty = $(event.target).closest('.talk').find('.ticketQty');
      var currentQty = +$qty.val();
      $qty.val(currentQty+1);
      updateTotal();
    });

    $('.ticketQty').on('focusout', function(){updateTotal();});

    function updateTotal() {
      $('.ticketQty').each(function() {
        var t_id = $(this).closest('.talk').data('id');
        var qty = +$(this).val();
        ticketBox.updateTickets(t_id, qty);
      });
      $('.pricePanel').text("$" + ticketBox.getTotal());
    }

  }

});


var shoppingCart = function (ticket_arr) {


  var initialize = function( t_arr ) {
    var t_obj = {};
    t_arr.forEach(function(t) {
        t_obj[t.id] = {topic: t.topic, price: t.price, seats: t.seats}
    });
    return t_obj;
  }

  var ticketList = initialize(ticket_arr);
  var ticketBucket = {};

  return {
      updateTickets : function(t_id, qty) {
          ticketBucket[t_id] = qty;
      },
      getPrice : function(t_id) {
        return ticketList[t_id].price
      },
      calPrice : function(t_id, qty) {
        return ticketList[t_id].price * qty
      },
      getTotal : function() {
        var sum = 0;
        $.each(ticketBucket, function(t_id, qty) {
          sum += ticketList[t_id].price * qty
        });
        return sum;
      },
      toString : function() {
        $.each(ticketList, function(k, v){
          console.log(k + ":" + v.topic + " | " + v.price + " | " + v.seats);
        });
        return ticketList.toString();
      }
  }
}


// var $ui_card = $('<div>', {class: 'ui-card'});
  //   var $card_header = $('<div>', {class: 'card-header content'});
  //     var $span = $('<span>', {class: 'right'}).text('header');
  //     var $icon = $('<img>', {class: 'header_icon', src: "http://placehold.it/300x300"});



  var router = new Router();
  Backbone.history.start();

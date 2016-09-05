var total = 0;

$(document).ready(function() {


  $('.button-collapse').sideNav({
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });


  var ticketBox = {};
  var priceTotal = 0;

  getTalks(createTicketBoard, shoppingCart);

  function getTalks(render, pool) {

    $.ajax({
      type: "GET",
      url: 'http://localhost:3000/api/events'
    }).done(
      function(res){
        // console.log(JSON.stringify(res));
        ticketBox = pool(res); //fetch from database ticketing info
        // exportedFunction = ticketBox;
        render(res); //Populate the ticket listing page
        // console.log(ticketBox.toString());
        switchEvent();

      }
    );

  }

  function createTicketBoard( talks ) {
    // generate a section for each talk
    var $talkList = $('<ul>', {class: 'talk-list collection'});
    var $pricePanel = $('<div>', {class: 'pricePanel'}).text("Total: $" + 0);

    talks.forEach(
      function (talk){
        // element generation
        var $talk = $('<li>', {class: "talk"}).data('id', talk.id);
          var $topic = $('<div>', {class: 'topic'}).text(talk.topic);
          var $price = $('<div>', {class: 'price'}).text("$" + talk.price);
          var $seats = $('<div>', {class: 'seats'}).text("50 seats");
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

        // //validation here: +number only: ^\d+$
        if( /^\d+$/.test($(this).val())){
          var qty = +$(this).val();
          ticketBox.updateTickets(t_id, qty);
        }else{
          $(this).val(0);
          ticketBox.updateTickets(t_id, 0);
        }

      });
      $('.pricePanel').text("Total: $" + ticketBox.getTotal());
    }

  }

  function switchEvent() {

    //click to switch to ticket listing page

    $('#buy-btn').on('click', function() {
      //reset all price fields and shopping cart

        ticketBox.clearBucket();
        $('.ticketQty').each(function () {
          $(this).val(0);
        });
        $('.pricePanel').text("total: $0");

    });

    //click to proceed to payment

    $('#book-btn').on('click', function(){summary();
      total = ticketBox.getTotal();
      console.log(total);
    });

    //Create a summary of tickets bought
    function summary() {
      console.log(ticketBox.toString());
      var booked = ticketBox.getAllTickets();
      var $tickets = $('<div>', {class : 'tickets'})
      for ( k in booked){
        if(booked[k] > 0){
          var $ticket = $('<div>', {class : 'ticket'});
            var $topic = $('<div>', {class : 'topic_booked'}).text(ticketBox.getTopic(k));
            var $qty = $('<div>', {class : 'qty_booked'}).text(booked[k]);
            var $price = $('<div>', {class : 'single_price'}).text(ticketBox.getPrice(k));
            var $sub_total = $('<div>', {class : 'sub_total'}).text(ticketBox.calPrice(k, booked[k]));

          $ticket.append($topic);
          $ticket.append($qty);
          $ticket.append($price);
          $ticket.append($sub_total);

          $tickets.append($ticket);
        }

      }//summary-payment
      $summary = $('<div>', {class : 'price_summary'}).text("Total Price: " + ticketBox.getTotal());

      $('.summary-payment').empty();
      $('.summary-payment').append($tickets);
      $('.summary-payment').append($summary);

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
      getTopic : function(t_id) {
        return ticketList[t_id].topic
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
      getAllTickets : function() {
        return ticketBucket;
      },
      clearBucket : function() {
        ticketBucket = {};
      },
      toString : function() {
        $.each(ticketList, function(k, v){
          console.log(k + ":" + v.topic + " | " + v.price + " | " + v.seats);
        });
        $.each(ticketBucket, function(k, v){
          console.log(k + " : " + v);
        });
        return ticketList.toString();
      }
  }
}

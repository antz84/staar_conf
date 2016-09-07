var exported;

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
        console.log(JSON.stringify(res));
        ticketBox = pool(res); //fetch from database ticketing info
        render(res); //Populate the ticket listing page
        // console.log(ticketBox.toString());
        switchEvent();
      }
    );

  }

  function createTicketBoard( talks ) {
    // generate a section for each talk
    var $talkList = $('<div>', {class: 'talk-list container'});
    var $pricePanel = $('<div>', {class: 'pricePanel'}).text("Total: $" + 0);

    talks.forEach(
      function (talk){
        // element generation

        //sample template
        // <div class="talk" id="1">
        //
        //   <div class="talk-header">
        //     <div class="topic">HTML Sample</div>
        //     <div class="time">31st, Oct @ 13:00 - 13:30</div>
        //   </div>
        //
        //   <div class="ticket-entry">
        //     <input class="ticketQty" type="text" value=100>
        //     <div class="price-seat">
        //       <div class="price">Price: $50</div>
        //       <div class="seats">Seats left: 50</div>
        //     </div>
        //   </div>
        //
        //   <div class="ticketForm">
        //     <button class="minus waves-effect waves-light btn"> - </button>
        //     <button class="plus waves-effect waves-light btn"> + </button>
        //   </div>
        //
        // </div>

        var $talk = $('<div>', {class: "talk"}).data('id', talk.id);
          var $talkHeader = $('<div>', {class: "talk-header"});
            var $topic = $('<div>', {class: 'topic'}).text(talk.topic);
            var $time = $('<div>', {class: 'time'}).text(talk.session_time);
          var $ticketEntry = $('<div>', {class: "ticket-entry"});
            var $ticketQty = $('<input>', {class: 'ticketQty', type: 'text', value: 0});
            var $priceSeat = $('<div>', {class: 'price-seat'});
              var $price = $('<div>', {class: 'price'}).text("$" + talk.price);
              var $seats = $('<div>', {class: 'seats'}).text("Tickets Left: " + talk.seats);
          var $ticketForm = $('<div>', {class: 'ticketForm'});
            var $minusBtn = $('<button>', {class: 'minus waves-effect waves-light btn'}).text("-");
            var $plusBtn = $('<button>', {class: 'plus waves-effect waves-light btn'}).text("+");

        // appending
        $ticketForm.append($ticketQty);
        $ticketForm.append($minusBtn);
        $ticketForm.append($plusBtn);

          $priceSeat.append($price);
          $priceSeat.append($seats);

        $ticketEntry.append($ticketQty);
        $ticketEntry.append($priceSeat);

        $talkHeader.append($topic);
        $talkHeader.append($time);

        $talk.append($talkHeader);
        $talk.append($ticketEntry);
        $talk.append($ticketForm);

        $talkList.append($talk)

      }
    );

    $('.ticketing').append($talkList);

    $('.ticketing').append($pricePanel);

    //event bundling
    $('.minus').on('click', function(event) {
      var $qty = $(event.target).closest('.talk').find('.ticketQty');
      var ticket_id = $(event.target).closest('.talk').data('id');
      var currentQty = Number($qty.val());
      if(currentQty !== 0) {
        $qty.val(currentQty-1);
        updateTotal(ticket_id, currentQty-1);
        // debugger
      }else{
        updateTotal(ticket_id, 0);
      }
    });

    $('.plus').on('click', function(event) {
      var $qty = $(event.target).closest('.talk').find('.ticketQty');
      var ticket_id = $(event.target).closest('.talk').data('id');
      var currentQty = +$qty.val();
      $qty.val(currentQty+1);
      updateTotal(ticket_id, currentQty+1);
    });

    $('.ticketQty').on('focusout', function(event){
      var $qty = $(event.target).closest('.talk').find('.ticketQty');
      var ticket_id = $(event.target).closest('.talk').data('id');
      updateTotal(ticket_id, $qty.val());
    });

    function updateTotal(t_id, qty) {

          // //validation here: +number only: ^\d+$
          if( /^\d+$/.test(qty) && +qty <= ticketBox.getSeats(t_id) ){
            $("#"+qty).find('.ticketQty').val(qty);
            var qty = +qty;
            console.log(qty);
            ticketBox.updateTickets(t_id, qty);
          }else if( +qty > ticketBox.getSeats(t_id)){
            $("#"+qty).find('.ticketQty').val(ticketBox.getSeats(t_id));
          }else{
            $("#"+qty).find('.ticketQty').val(0);
            ticketBox.updateTickets(t_id, 0);
          }
          $('.pricePanel').text("Total: $" + ticketBox.getTotal());
    }

    // function updateTotal() {
    //   $('.ticketQty').each(function() {
    //     var t_id = $(this).closest('.talk').data('id');
    //     // //validation here: +number only: ^\d+$
    //     if( /^\d+$/.test($(this).val()) && +$(this).val() <= ticketBox.getSeats(t_id) ){
    //       var qty = +$(this).val();
    //       console.log(qty);
    //       ticketBox.updateTickets(t_id, qty);
    //     }else if( +$(this).val() > ticketBox.getSeats(t_id)){
    //       $(this).val(ticketBox.getSeats(t_id));
    //     }else{
    //       $(this).val(0);
    //       ticketBox.updateTickets(t_id, 0);
    //     }
    //
    //   });
    //   $('.pricePanel').text("Total: $" + ticketBox.getTotal());
    // }

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

    $('#book-btn').on('click', function(){
      $('.button-collapse').sideNav('hide');
      summary();//Display the payment summary
      exported = ticketBox;
      console.log(ticketBox.getTotal());
    });

    $( "#pay-btn" ).click(function(event) {
      $('.button-collapse').sideNav('hide');
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
        t_obj[t.id] = {topic: t.topic, time: t.session_time,  price: t.price, seats: t.seats}
    });
    return t_obj;
  }

  var ticketList = initialize(ticket_arr);
  var ticketBucket = {};

  return {
      updateTickets : function(t_id, qty) {
        //if(qty!==0){
          ticketBucket[t_id] = qty;
        //}
      },
      selfUpdate : function(callback){
        $.ajax({
          type: "GET",
          url: 'http://localhost:3000/api/events'
        }).done(
          function(res){
            console.log(JSON.stringify(res));
            ticketList = initialize(res);
            callback(ticketList);
          }
        );
      },
      getTopic : function(t_id) {
        return ticketList[t_id].topic
      },
      getSeats : function(t_id) {
        return ticketList[t_id].seats
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
        // return ticketList.toString();
      }
  }
}

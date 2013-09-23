function reset () {
  $('#player1 td').removeClass('active').first().addClass('active');
  $('#player2 td').removeClass('active').first().addClass('active');
};

$(document).ready(function() {

  $("body").keyup(event,function(){ 
    if (event.keyCode == 81) {
      var player1 = $('#player1 .active');
      player1.next().addClass('active');
      player1.removeClass('active');
    }
    else if (event.keyCode == 80) {
      var player2 = $('#player2 .active');
      player2.removeClass('active');
      player2.next().addClass('active');
    };

    if ($('#player1 .active').size() == 0) {
      alert("Player 1 Wins!!!!!");
      reset();
    }
    else if ($('#player2 .active').size() == 0) {
      alert("Player 2 Wins!!!!!");
      reset();
    };

  });


});

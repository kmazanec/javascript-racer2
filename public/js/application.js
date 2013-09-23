function show_results () {
  $('#race_results').show();
};


function reset () {
  $('#player1 td').removeClass('active').first().addClass('active');
  $('#player2 td').removeClass('active').first().addClass('active');
};

$(document).ready(function() {

  $("#login_form").submit(function(event) {
    event.preventDefault();
    var url = $(this).attr('action');
    var data = $(this).serialize();

    $.post(url, data, function(response) {
      $('#login_container').hide();
      $('#racetrack').show();
      $('#p1').text(response.p1_name);
      $('#p2').text(response.p2_name);
      var current_game_id = response.game_id;
      $('#game_id').text(current_game_id);

    });

  });


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
      var winner = $('#p1').text();
      show_results();
      alert(winner + " Wins!!!!!");
      reset();
    }
    else if ($('#player2 .active').size() == 0) {
      var winner = $('#p2').text();
      show_results();
      alert(winner + " Wins!!!!!");
      reset();
    };

  });



});

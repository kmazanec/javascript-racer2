function show_results () {
  $('#race_results').show();
};

function post_results (the_winner, time) {
  var url = "/results";
  var data = { winner: the_winner, time: time, game_id: $('#game_id').text() };

  $.post(url, data, function(response){

  });
};


function reset () {
  $('#player1 td').removeClass('active').first().addClass('active');
  $('#player2 td').removeClass('active').first().addClass('active');
};

$(document).ready(function() {

  var start_time = 0;
  var end_time = 0;

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

  $("#race_again").on("click", function(event) {
    $('#racetrack').hide();
    $('#race_results').hide();
    $("#elapsed_time").text("");
    $('#login_container').show();
  });

  $("#exit").on("click", function(event) {
    $('#racetrack').hide();
    $('#race_results').hide();
    $("#elapsed_time").text("");
    $('#player1_name').val("");
    $('#player2_name').val("");
    $('#login_container').show();
  });

  $("#start_timer").on("click", function(event) {
    $("#elapsed_time").text("GO!");
    start_time = $.now();
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
      end_time = $.now();
      post_results(winner,end_time - start_time);
      show_results();
      alert(winner + " Wins!!!!!" + (end_time - start_time));
      reset();
    }
    else if ($('#player2 .active').size() == 0) {
      var winner = $('#p2').text();
      end_time = $.now();

      post_results(winner,end_time - start_time);      
      show_results();
      alert(winner + " Wins!!!!!" + (end_time - start_time));
      reset();
    };

  });



});

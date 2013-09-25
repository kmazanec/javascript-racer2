function Racer (name, position) {
  this.name = name;
  this.position = position;
}

Racer.prototype.move = function() {
  this.position.removeClass('active');
  this.position.next().addClass('active');
  this.position = this.position.next();
};


function Game (racer1, racer2) {
  this.racer1 = racer1;
  this.racer2 = racer2;
}

Game.prototype.render = function() {
  $('#login_container').hide();
  $('#racetrack').show();
  $('#p1').text(this.racer1.name);
  $('#p2').text(this.racer2.name);
  $('#game_id').text(this.id);
};

Game.prototype.render_results = function() {
  $('#results_game_id').text(this.id);
  $('#results_matchup').text(this.racer1.name + " vs. " + this.racer2.name);
  $('#results_winner').text(this.winner);
  $('#results_time').text(this.final_time);
  $('#results_link').text("localhost:9393/game/"+this.id);
  $('#results_link').attr("href", "/game/"+this.id);
  $('#race_results').show();
};

Game.prototype.reset = function () {
  $('#player1 td').removeClass('active').first().addClass('active');
  $('#player2 td').removeClass('active').first().addClass('active');
};

// Game.prototype.listen = function(event) {
//   console.log("Made it to the key listener");
//   console.log(racer1);
//   console.log(racer2);
//     if (event.keyCode == 81) {
//       this.racer1.move();
//     }
//     else if (event.keyCode == 80) {
//       this.racer2.move();
//     }
//     if (racer1.position.size() === 0) {
//       this.stop(this.racer1.name);
//     }
//     else if (racer1.position.size() === 0) {
//       this.stop(this.racer2.name);
//     }
// };

Game.prototype.start = function() {
  this.start_time = $.now();
  var game = this;
  $("body").bind("keyup",function(event){
    if (event.keyCode == 81) {
      game.racer1.move();
    }
    else if (event.keyCode == 80) {
      game.racer2.move();
    }
    if (game.racer1.position.size() === 0) {
      game.stop(game.racer1.name);
    }
    else if (game.racer2.position.size() === 0) {
      game.stop(game.racer2.name);
    }
  });
};

Game.prototype.end_time = function() {
  this.final_time = (($.now() - this.start_time)/1000);
};

Game.prototype.stop = function(winner) {
  this.end_time();
  this.winner = winner;
  game = this;
  $("body").unbind("keyup",this.listen);
  var url = '/results';
  var data = { player1_name: this.racer1.name, player2_name: this.racer2.name, winner: winner, time: this.final_time };
  $.post(url, data, function(response){
    game.id = response.game_id;
    game.render_results();
  });
};




$(document).ready(function() {

  var game;

  $("#login_form").submit(function(event) {
    event.preventDefault();
    var racer1 = new Racer($('#login_form #player1_name').val() ,$('#player1 .active'));
    var racer2 = new Racer($('#login_form #player2_name').val() ,$('#player2 .active'));
    game = new Game(racer1, racer2);
    game.render();
  });
  $("#start_timer").on("click", function(event) {
    $("#elapsed_time").text("GO!");
    game.start();
  });
  $("#race_again").on("click", function(event) {
    game.reset();
    $('#racetrack').hide();
    $('#race_results').hide();
    $("#elapsed_time").text("");
    $('#login_container').show();
  });

  $("#exit").on("click", function(event) {
    game.reset();
    $('#racetrack').hide();
    $('#race_results').hide();
    $("#elapsed_time").text("");
    $('#player1_name').val("");
    $('#player2_name').val("");
    $('#login_container').show();
  });

});
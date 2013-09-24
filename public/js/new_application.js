function Racer (name, position) {
  this.name = name;
  this.position = position;
}

Racer.prototype.move = function() {
  this.position.removeClass('active');
  this.position.next().addClass('active');
  this.position = this.position.next();
};


function Game (url, data, racer1, racer2) {
  this.racer1 = racer1;
  this.racer2 = racer2;
  $.post(url, data, function(response){
    this.id = response.game_id;
  });
}

Game.prototype.render = function() {
  $('#login_container').hide();
  $('#racetrack').show();
  $('#p1').text(this.racer1.name);
  $('#p2').text(this.racer2.name);
  $('#game_id').text(this.id);
};

Game.prototype.listen = function(event) {
  console.log("Made it to the key listener");
    if (event.keyCode == 81) {
      this.racer1.move();
    }
    else if (event.keyCode == 80) {
      this.racer2.move();
    }

    if (racer1.position.size() === 0) {
      stop_game($('#p1').text());
    }
    else if (racer1.position.size() === 0) {
      stop_game($('#p2').text());
    }
};

Game.prototype.start = function() {
  this.start_time = $.now();
  $("body").bind("keyup",this.listen);
};


$(document).ready(function() {

  var game;

  $("#login_form").submit(function(event) {
    event.preventDefault();

    var racer1 = new Racer($('#login_form #player1_name').val() ,$('#player1 .active'));
    var racer2 = new Racer($('#login_form #player2_name').val() ,$('#player2 .active'));

    game = new Game(url, data, racer1, racer2);
    game.render();
  });

  $("#start_timer").on("click", function(event) {
    $("#elapsed_time").text("GO!");

    game.start();
  });


});
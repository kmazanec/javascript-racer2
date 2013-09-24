require 'json'

# ---------GET----------------

get '/' do
  erb :index
end

get '/game/:game_id' do
  @game = Game.find_by(id: params[:game_id])
  if @game
    @player1 = @game.racers[0]
    @player2 = @game.racers[1]

    erb :game
  else
    redirect to ('/')
  end

end

# -----------POST--------------

post '/login' do
  @player1 = Racer.find_or_create_by(name: params[:player1_name])
  @player2 = Racer.find_or_create_by(name: params[:player2_name])
  @game = Game.create()
  @game.racers << @player1
  @game.racers << @player2
  @game.save

  if request.xhr?
    content_type :json
    { p1_name: @player1.name, p2_name: @player2.name, game_id: @game.id }.to_json
  else
    erb :index
  end

end


post '/results' do
  puts "Results:"
  puts params.inspect

  game = Game.find_by(id: params[:game_id].to_i)
  if game
    game.update(winner_id: Racer.find_by(name: params[:winner]), time: params[:time].to_f)
    content_type :json
    { game_id: game.id }.to_json
  else
    redirect to ('/')
  end

end

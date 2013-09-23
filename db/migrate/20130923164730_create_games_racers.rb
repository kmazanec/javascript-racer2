class CreateGamesRacers < ActiveRecord::Migration
  def change
    create_table :games_racers do |t|
      t.belongs_to :racer
      t.belongs_to :game
    end
  end
end

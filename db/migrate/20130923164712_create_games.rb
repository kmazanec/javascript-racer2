class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.float :time
      t.string :winner_id
      t.timestamps
    end
  end
end

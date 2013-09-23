class CreateRacers < ActiveRecord::Migration
  def change
    create_table :racers do |t|
      t.string :name
      t.timestamps
    end
  end
end

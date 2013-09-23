class Racer < ActiveRecord::Base
  validates :name, uniqueness: true, presence: true

  has_and_belongs_to_many :games
end

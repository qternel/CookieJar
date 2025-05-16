class Achievement < ApplicationRecord
  belongs_to :user

  validates :description, presence: true
  validates :cookie_count, numericality: { greater_than: 0 }
end

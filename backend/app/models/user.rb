class User < ApplicationRecord
  has_many :achievements, dependent: :destroy
  has_secure_password validations: false
  validates :login, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6, too_short: "Пароль должен быть как минимум длины 6" }, confirmation: true
end

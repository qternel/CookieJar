class User < ApplicationRecord
  has_secure_password validations: false
  serialize :achievements, type: Array, coder: JSON
  validates :login, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6, too_short: "Пароль должен быть как минимум длины 6" }, confirmation: true
end

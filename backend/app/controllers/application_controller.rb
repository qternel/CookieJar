class ApplicationController < ActionController::API
  before_action :authorize_request

  private

  attr_reader :current_user
  def authorize_request
    header = request.headers["Authorization"]
    token = header&.split(" ")&.last

    unless token
      render json: { error: "Missing token" }, status: :unauthorized
      return
    end

    decoded = decode_token(token)
    if decoded.nil?
      render json: { error: "Invalid or expired token" }, status: :unauthorized
      return
    end

    @current_user = User.find(decoded[:user_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "User not found" }, status: :unauthorized
  rescue JWT::ExpiredSignature
    render json: { error: "Token has expired" }, status: :unauthorized
  rescue JWT::DecodeError
    render json: { error: "Invalid token" }, status: :unauthorized
  end

  def encode_token(payload)
    payload[:exp] = 72.hours.from_now.to_i
    secret_key = Rails.application.credentials.secret_key_base ||
      Rails.application.secret_key_base

    JWT.encode(payload, secret_key)
  end

  def decode_token(token)
    secret_key = Rails.application.credentials.secret_key_base ||
      Rails.application.secret_key_base
    decoded = JWT.decode(token, secret_key)[0]
    HashWithIndifferentAccess.new(decoded)
  rescue JWT::ExpiredSignature
    "the token has expired"
    nil
  rescue JWT::DecodeError
    "invalid token"
    nil
  end
end

class ApplicationController < ActionController::API
  before_action :authorize_request

  private

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
    "the token is expired"
    nil
  rescue JWT::DecodeError
    "invalid token"
    nil
  end

  def authorize_request
    header = request.headers["Authorization"]
    token = header&.split(" ")&.last

    unless token
      return render json: { error: "Missing token" }, status: :unauthorized
    end

    decoded = decode_token(token)
    if decoded.nil?
      return render json: { error: "Invalid or expired token" }, status: :unauthorized
    end

    @current_user = User.find(decoded[:user_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "User not found" }, status: :unauthorized
  rescue JWT::ExpiredSignature
    render json: { error: "Token has expired" }, status: :unauthorized
  rescue JWT::DecodeError
    render json: { error: "Invalid token" }, status: :unauthorized
  end
end

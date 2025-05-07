class ApplicationController < ActionController::API
  before_action :authorize_request

  private

  def encode_token(payload)
    # Используйте секретный ключ из credentials или секретов Rails
    secret_key = Rails.application.credentials.secret_key_base ||
      Rails.application.secret_key_base

    JWT.encode(payload, secret_key)
  end

  def decode_token(token)
    HashWithIndifferentAccess.new(JWT.decode(token, Rails.application.secrets.secret_key_base)[0])
  rescue
    nil
  end

  def authorize_request
    header = request.headers["Authorization"]
    token = header&.split(" ")&.last
    decoded = decode_token(token)
    if decoded
      @current_user = User.find(decoded[:user_id])
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "User not found" }, status: :unauthorized
  end
end

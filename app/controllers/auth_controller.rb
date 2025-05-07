class AuthController < ApplicationController
  skip_before_action :authorize_request, only: [:signup, :signin]

  def signup
    user = User.new(user_params)
    user.achievements << "Registered!"
    if user.save
      token = encode_token(user_id: user.id)
      render json: { token: token, user_id: user.id }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: 422
    end
  end

  def signin
    user = User.find_by(login: params[:login])
    if user&.authenticate(params[:password])
      token = encode_token(user_id: user.id)
      render json: { token: token }
    else
      render json: { error: "Invalid credentials" }, status: :unauthorized
    end
  end


  private

  def user_params
    params.permit(:login, :password, :password_confirmation)
  end
end

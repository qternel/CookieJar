class UsersController < ApplicationController
  before_action :authorize_request

  def me
    render json: current_user.as_json(include: :achievements)
  end
end
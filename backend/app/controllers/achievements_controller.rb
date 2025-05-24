class AchievementsController < ApplicationController
  before_action :authorize_request

  def create
    achievement = current_user.achievements.new(achievement_params)
    achievement.cookie_count = rand(5..20)
    current_user.update_column(:cookies, current_user.cookies + achievement.cookie_count)
    if achievement.save
      render json: {
        message: "Achievement created!",
        cookies_received: achievement.cookie_count,
        achievement: achievement
      }, status: :created
    else
      render json: { errors: { achievement: achievement.errors.full_messages, }
      }, status: :unprocessable_entity
    end
  end

  private

  def achievement_params
    params.require(:achievement).permit(:description)
  end
end

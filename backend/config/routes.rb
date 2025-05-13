Rails.application.routes.draw do
  post "auth/signup", to: "auth#signup"
end

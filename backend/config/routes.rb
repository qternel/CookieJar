Rails.application.routes.draw do
  post "auth/signup", to: "auth#signup"
  post "auth/signin", to: "auth#signin"

  resource :user, only: [] do
    get :me, to: 'users#me'
  end

  resources :achievements, only: [:create]
end
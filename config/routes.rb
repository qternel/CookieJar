Rails.application.routes.draw do
  post '/signup', to: 'auth#signup'
  post '/signin', to: 'auth#signin'
  #  get '/me', to: 'users#me'
  # post '/achievements', to: 'achievements#create'
end
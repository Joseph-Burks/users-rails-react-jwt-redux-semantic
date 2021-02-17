Rails.application.routes.draw do
  post '/login', to: 'users#log_in'
  get '/get_user', to: 'users#get_user'
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

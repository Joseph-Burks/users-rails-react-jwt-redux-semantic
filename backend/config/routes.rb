Rails.application.routes.draw do
  resources :users
  post '/login', to: 'users#log_in'
  get '/get_user', to: 'users#get_user'
  post '/rails/active_storage/direct_uploads', to: 'direct_uploads#create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

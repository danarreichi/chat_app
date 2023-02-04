Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :layouts
  get "home", to: "main#home"

  # Create new user
  post "createUser", to: "main#createUser"
end

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :layouts

  # Home page
  root "main#home"

  post "home", to: "main#sendMessage"

  # Create new user (AJAX request)
  post "createUser", to: "main#createUser"

  # Create new room (AJAX request)
  post "createRoom", to: "main#createRoom"

  # Select the room (AJAX request)
  get "selectRoom", to: "main#selectRoom"
end

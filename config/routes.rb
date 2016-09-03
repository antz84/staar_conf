Rails.application.routes.draw do
  resources :events
  resources :tickets
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "/api/events", to: "api/events#list_events"
  root :to => 'events#index'

  post "/charges", to: "charges#create"
end

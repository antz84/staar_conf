Rails.application.routes.draw do
  resources :events
  resources :tickets
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root :to => 'events#index'
end
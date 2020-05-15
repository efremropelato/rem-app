Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :houses, only: [:index, :create, :show, :update, :destroy]
      resources :complex_buildings, only: [:index, :create, :show, :update, :destroy]
      resources :commecial_units, only: [:index, :create, :show, :update, :destroy]
    end
  end
  root 'hello_world#index'
  get 'hello_world', to: 'hello_world#index'
  get 'bye_world', to: 'hello_world#index'
end

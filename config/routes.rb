Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :assets, only: [:index]
      resources :houses, only: [:create, :show, :update, :destroy]
      resources :complex_buildings, only: [:create, :show, :update, :destroy]
      resources :commecial_units, only: [:create, :show, :update, :destroy]
    end
  end
  get 'houses/:id/edit', to: 'main#index';
  get 'houses/:id', to: 'main#index';
  get 'houses/new', to: 'main#index';
  get 'complex_buildings/:id/edit', to: 'main#index';
  get 'complex_buildings/:id', to: 'main#index';
  get 'complex_buildings/new', to: 'main#index';
  get 'commecial_units/:id/edit', to: 'main#index';
  get 'commecial_units/:id', to: 'main#index';
  get 'commecial_units/new', to: 'main#index';
  root 'main#index'
end

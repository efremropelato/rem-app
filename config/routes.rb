Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :assets, only: [:index]
      get 'assets/:klassName/:id/images', to: 'assets#getimages'
      post 'assets/:klassName/:id/images', to: 'assets#postimages'
      resources :houses, only: [:create, :show, :update, :destroy]
      resources :complex_buildings, only: [:create, :show, :update, :destroy] 
      resources :commecial_units, only: [:create, :show, :update, :destroy]
    end
  end
  
  root 'main#index'
end

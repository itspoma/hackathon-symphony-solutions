SymphonyHackathon::Application.routes.draw do
  resources :users

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  scope '/api' do 
    scope '/v1' do
      resources :points, controller: :tasks
      resources :categories, controller: :categories
      get 'test', to: 'homes#index'
    end
  end
  
  root 'homes#index'
end

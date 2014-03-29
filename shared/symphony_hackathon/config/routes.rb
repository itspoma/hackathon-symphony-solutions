SymphonyHackathon::Application.routes.draw do
  scope '/api' do 
    scope '/v1' do
      resources :points, controller: :tasks
      get 'test', to: 'homes#index'
    end
  end
  
  root 'homes#index'
end

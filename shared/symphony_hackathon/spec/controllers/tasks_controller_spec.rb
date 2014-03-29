require 'spec_helper'

describe TasksController do

  it 'should get :index' do
    FactoryGirl.create_list(:tasks, 20)
    get :index, format: :json
    puts @response.inspect
  end

end
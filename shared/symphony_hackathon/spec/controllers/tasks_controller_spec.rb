require 'spec_helper'

describe TasksController do

  render_views

  it 'should get :index' do
    FactoryGirl.create_list(:tasks, 20)
    get :index, format: :json
    @response.status.should be(200)
  end

end
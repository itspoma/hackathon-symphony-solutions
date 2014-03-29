require 'spec_helper'

describe TasksController do

  it 'should get :index' do
    get :index, format: :json
    create(:tasks)
    puts response.inspect
  end

end
require 'spec_helper'

describe TasksController do

  render_views

  it 'should get :index' do
    FactoryGirl.create_list(:tasks, 20)
    get :index, format: :json
    @response.status.should be(200)
  end

  it 'should create task suplied with json' do
    params = {
      format: :json,
      point: { 
        description: 'test',
        title: 'test',
        lng: 123.23,
        ltd: 123.23,
        actual_to: (Time.now + 1.day),
        actual_from: Time.now,
        category_id: 2,
        tags: 'firts_tag, second_tag, etc',
        user: {
          full_name: 'Andrew Yasinishyn',
          phone: '+380671231212',
          email: 'example@mail.com'
        }
      }
    }
    post :create, params
    puts Task.all.inspect
  end

end
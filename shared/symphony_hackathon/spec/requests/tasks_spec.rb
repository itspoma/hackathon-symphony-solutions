require 'spec_helper'

describe 'Tasks' do

  it 'should render :index' do
    tasks = FactoryGirl.create_list(:tasks, 20)
    get points_path, format: :json
    response_body = JSON.parse(response.body)
    response_body.map{|t| t['id']}.should == tasks.map(&:id)
  end

  it 'should search for tasks' do
    first_task = create(:tasks, ltd: 50, lng: 50)
    second_task = create(:tasks, ltd: 150, lng: 150)
    get points_path, format: :json, point: { ltd: first_task.ltd, lng: first_task.lng }
    response_body = JSON.parse(response.body)
    response_body.map{|t| t['id']}.first.should == first_task.id
  end

end
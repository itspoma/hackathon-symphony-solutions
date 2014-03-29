FactoryGirl.define do

  factory :tasks, class: 'Task' do
    sequence(:ltd){ |n| 55 + n * 20}
    sequence(:lng){ |n| 300 + n * 20}
    sequence(:description){ |n| "Test task ##{n}"}
  end

end

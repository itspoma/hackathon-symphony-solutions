FactoryGirl.define do

  factory :tasks, class: 'Task' do
    sequence(:ltd){ |n| 55 + n * 20}
    sequence(:lng){ |n| 300 + n * 20}
    sequence(:description){ |n| "Test task ##{n}"}
    sequence(:user) do |n| 
      {
        full_name: 'test full name',
        email:     'user@example.com',
        phone:      '+380671212123'
      }
    end
  end

end

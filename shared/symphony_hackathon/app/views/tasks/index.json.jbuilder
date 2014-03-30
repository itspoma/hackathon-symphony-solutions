json.array!(@tasks) do |task|
  json.id          task.id
  json.title       task.title
  json.description task.description
  json.ltd         task.ltd
  json.lng         task.lng
  json.actual_to   task.actual_to
  json.actual_from task.actual_from
  json.created_at  task.created_at
  json.updated_at  task.updated_at
  json.category    task.category
  if task.user
    json.user do
      json.full_name   task.user.full_name
      json.email       task.user.email
      json.phone       task.user.phone
      json.created_at  task.user.created_at
      json.updated_at  task.user.updated_at
    end
  end
end
json.array!(@tasks) do |task|
  json.extract! task, :id, :title, :description, :ltd, :lng, :actual_to
  json.url task_url(task, format: :json)
end
json.array!(@categories) do |c|
  json.id   c.id
  json.name c.name
  json.key  c.key
end
#encoding: utf-8

class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name
      t.string :key

      t.timestamps
    end

    Category.create!([{name: 'Спорт', key: 'sport'}, {name: 'Собаки', key: 'dogs'}, {name: 'Їжа', key: 'food'}])
  end
end

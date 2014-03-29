class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.float :ltd
      t.float :lng
      t.date :actual_to

      t.timestamps
    end
  end
end

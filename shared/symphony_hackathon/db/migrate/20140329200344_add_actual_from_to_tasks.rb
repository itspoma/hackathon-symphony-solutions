class AddActualFromToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :actual_from, :date
  end
end

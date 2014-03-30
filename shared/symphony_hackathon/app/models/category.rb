class Category < ActiveRecord::Base

  attr_accessible :key, :name
  has_many :tasks

end

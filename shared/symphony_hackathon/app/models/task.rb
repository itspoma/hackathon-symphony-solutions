class Task < ActiveRecord::Base
  acts_as_taggable

  belongs_to :user
  accepts_nested_attributes_for :user
end

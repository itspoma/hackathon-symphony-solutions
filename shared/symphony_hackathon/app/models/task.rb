class Task < ActiveRecord::Base

  attr_accessible :address, :ltd, :lng, :description, :title, :actual_to

  acts_as_mappable :default_units => :miles,
                   :default_formula => :sphere,
                   :distance_field_name => :distance,
                   :lat_column_name => :ltd,
                   :lng_column_name => :lng

  acts_as_taggable

  belongs_to :user
  accepts_nested_attributes_for :user

end

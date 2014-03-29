class Task < ActiveRecord::Base

  attr_accessible :address, :ltd, :lng, :description, :title, :actual_to
  geocoded_by :address, :latitude  => :ltd_eq, :longitude => :lng_eq
  #after_validation :geocode, :if => :address_changed?

  acts_as_taggable

  belongs_to :user
  accepts_nested_attributes_for :user

end

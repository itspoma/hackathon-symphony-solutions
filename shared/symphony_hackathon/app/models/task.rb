class Task < ActiveRecord::Base

  attr_accessible :address, :ltd, :lng, :description, :title, :actual_to, :actual_from, :user, :user_id
  # geocoded_by :address, :latitude  => :ltd_eq, :longitude => :lng_eq
  # after_validation :geocode, :if => :address_changed?

  acts_as_taggable

  belongs_to :user

  def user=(attributes)
    self.user_id = User.create_with(attributes).find_or_create_by(phone: attributes[:phone]).id
  end

end

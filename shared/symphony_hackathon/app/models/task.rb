class Task < ActiveRecord::Base

  attr_accessible :ltd, :lng, :description, :title, :actual_to, :actual_from, :user, :category_id

  acts_as_mappable :default_units => :miles,
                   :default_formula => :sphere,
                   :distance_field_name => :distance,
                   :lat_column_name => :ltd,
                   :lng_column_name => :lng

  acts_as_taggable

  belongs_to :user
  belongs_to :category

  def user=(attributes)
    self.user_id = User.create_with(attributes).find_or_create_by(phone: attributes[:phone]).id
    self.save
  end

end

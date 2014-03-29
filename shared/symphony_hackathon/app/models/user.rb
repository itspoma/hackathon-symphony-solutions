class User < ActiveRecord::Base
  has_many :tasks

  validate :full_name, :phone, :email, presence: true
  validate :phone, :email, uniqueness: true
end

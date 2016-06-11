class PhoneNumber < ActiveRecord::Base
  attr_accessible :name, :number

  has_many :messages, :dependent => :destroy
end

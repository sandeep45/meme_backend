class Message < ActiveRecord::Base
  attr_accessible :body, :direction, :phone_number_id, :tag, :text

  belongs_to :phone_number
end

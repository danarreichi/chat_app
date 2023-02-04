class Message < ApplicationRecord
  belongs_to :room, inverse_of: :room_messages
  belongs_to :user
end

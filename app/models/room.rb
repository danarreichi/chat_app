class Room < ApplicationRecord
    validates :room_name, presence: true
end

class MainController < ApplicationController
    def home
    end

    def createUser
        @insert = User.create({username: params[:username]})
        if @insert.save
            render plain: "inserted successfully id: #{@insert.id}, username: #{@insert.username}"
        end
    end
end

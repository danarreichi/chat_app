class MainController < ApplicationController
    def home
        @rooms = Room.all
    end

    def createRoom
        @insert = Room.create({room_name: params[:room_name]})
        if @insert.save
            ActionCable.server.broadcast 'GetmessageChannel', {new_room: @insert}
        end
    end

    def createUser
        @insert = User.create({username: params[:username]})
        if @insert.save
            session[:user_id] = @insert.id
            session[:user_name] = @insert.username
            render json: @insert
        end
    end

    def sendMessage
        @insert = Message.create({room_id: params[:room_id], message: params[:message], user_id: session[:user_id]})
        @message = {room_id: params[:room_id], message: params[:message], user_id: session[:user_id]}
        ActionCable.server.broadcast 'GetmessageChannel', {new_message: @message}
    end

    def selectRoom
        @rooms = Room.all
        @roomMessage = Message.where(room_id: params[:id])
        render json: {roomMessage: @roomMessage, rooms: @rooms}
        # ActionCable.server.broadcast 'GetmessageChannel', {room_id: params[:id], user_id: session[:user_id], user_name: session[:user_name]}
    end
end

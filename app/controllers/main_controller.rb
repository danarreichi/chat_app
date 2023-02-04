class MainController < ApplicationController
    def home
        flash[:harus_login] = "Welcome"
    end
end

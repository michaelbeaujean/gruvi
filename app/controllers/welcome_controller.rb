class WelcomeController < ApplicationController

  def index
    @user = User.new
  end

	def pusher
		Pusher.url = "http://72df76eb0f3ff7e19b92:1d63892b5ce19dc9e5d0@api.pusherapp.com/apps/74865"

		Pusher['test_channel'].trigger('my_event', {
		  message: 'hello world'
		})
	end
end

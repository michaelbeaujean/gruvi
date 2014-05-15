class WelcomeController < ApplicationController

  def index
    @user = User.new
  end

	def pusher
		Pusher.url = '#{{ENV["PUSHER_KEY"]}:#{ENV["PUSHER_SECRET"]}@api.pusherapp.com/apps/74865'

		Pusher['test_channel'].trigger('my_event', {
		  message: 'hello world'
		})

		Pusher['test_channel'].trigger('bills_event', {

		})

		render :json => {}
	end

end

class WelcomeController < ApplicationController

  def index
    @user = User.new
  end

	def pusher
		Pusher.url = "http://#{ENV['PUSHER_KEY']}:#{ENV['PUSHER_SECRET']}@api.pusherapp.com/apps/#{ENV['PUSHER_APP_ID']}"

		Pusher.trigger('test_channel', 'bills_event', {
			"note" => params[:note],
			"startTime" => params[:startTime]
		})

		render :json => {}
	end

end

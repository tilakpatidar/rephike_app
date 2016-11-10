class DashboardController < ApplicationController
	before_action :check_owner ,:only => [:index, :show_profile]


	def index
	end

	def show_profile

	end

	private

	def destroy
		if user_signed_in?
			current_user.destroy
			redirect_to root_path
		end
	end

	def check_owner
		if not user_signed_in?
			redirect_to root_path
		end
	end
end

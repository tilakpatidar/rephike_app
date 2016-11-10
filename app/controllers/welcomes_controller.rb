class WelcomesController < ApplicationController

	before_action :dashboard_redirect ,:only => [:index]

    include ActionController::Caching::Pages
    self.page_cache_directory = "#{Rails.root.to_s}/public/deploy"
    caches_page :index

	def index

	end

	private

	def dashboard_redirect
		if user_signed_in?
			redirect_to dashboard_index_path
		end
	end

	def check_owner
		if not  user_signed_in?
			redirect_to root_path
		end
	end 
end

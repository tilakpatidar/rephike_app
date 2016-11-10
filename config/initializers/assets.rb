# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )


 #for ckeditor image browser
 Rails.application.config.assets.precompile += %w( ckeditor/filebrowser/images/*)




#For contact input
  Rails.application.config.assets.precompile += %w( intlTelInput.js )
  Rails.application.config.assets.precompile += %w( libphonenumber/utils.js )
  Rails.application.config.assets.precompile += %w( intlTelInput.css )

#For profile_pic upload
  Rails.application.config.assets.precompile += %w( dropzone.js )
  Rails.application.config.assets.precompile += %w( dropzone/basic.css )

  Rails.application.config.assets.precompile += %w( rest_js/application.js )

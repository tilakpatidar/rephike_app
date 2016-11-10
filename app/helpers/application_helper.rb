module ApplicationHelper
  def user_avatar user
    image_tag(user.avatar.url(:thumb), :class => 'round-image-50')
  end
end

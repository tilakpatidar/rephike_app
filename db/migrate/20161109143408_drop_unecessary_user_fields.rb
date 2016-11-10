class DropUnecessaryUserFields < ActiveRecord::Migration
  def change
  	remove_column :users, :bio
  	remove_column :users, :location
  end
end

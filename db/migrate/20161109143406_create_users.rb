class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :contact
      t.text :bio
      t.integer :gender
      t.string :location
      t.string :dob

      t.timestamps null: false
    end
  end
end

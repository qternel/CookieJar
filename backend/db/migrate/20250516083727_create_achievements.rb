class CreateAchievements < ActiveRecord::Migration[8.0]
  def change
    create_table :achievements do |t|
      t.string :description
      t.integer :cookie_count
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

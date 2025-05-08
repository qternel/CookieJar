class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :login
      t.string :password_digest
      t.text :achievements
      t.integer :cookies

      t.timestamps
    end
    add_index :users, :login, unique: true
  end
end

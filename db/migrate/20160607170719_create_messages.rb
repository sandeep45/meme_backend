class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :body
      t.string :direction
      t.integer :phone_number_id

      t.timestamps
    end

    add_index :messages, :phone_number_id
  end
end

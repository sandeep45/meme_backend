class CreatePhoneNumbers < ActiveRecord::Migration
  def change
    create_table :phone_numbers do |t|
      t.string :number
      t.string :name

      t.timestamps
    end
  end
end

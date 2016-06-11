class AddTagAndtextToMessage < ActiveRecord::Migration
  def change
    add_column :messages, :tag, :string
    add_column :messages, :text, :string
  end
end

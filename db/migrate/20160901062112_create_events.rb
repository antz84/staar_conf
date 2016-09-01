class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :topic
      t.integer :price
      t.integer :seats

      t.timestamps
    end
  end
end

class CreateTickets < ActiveRecord::Migration[5.0]
  def change
    create_table :tickets do |t|
      t.integer :number
      t.string :firstname
      t.string :surname
      t.string :email
      t.references :event, foreign_key: true

      t.timestamps
    end
  end
end

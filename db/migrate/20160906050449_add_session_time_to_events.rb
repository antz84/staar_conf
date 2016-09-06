class AddSessionTimeToEvents < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :session_time, :string
  end
end

class CreateAssets < ActiveRecord::Migration[6.0]
  def change
    create_table :assets do |t|
      t.string :owner
      t.string :address
      t.integer :sqmt
      t.decimal :price
      t.string :type

      t.timestamps
    end
  end
end

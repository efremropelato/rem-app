class CreateHouses < ActiveRecord::Migration[6.0]
  def up
    execute 'CREATE TABLE houses (rooms int4, floors int4, air_cond bool ) INHERITS (assets);'
  end

  def down
    execute 'DROP TABLE houses;'
  end
end

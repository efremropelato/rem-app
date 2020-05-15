class CreateComplexBuildings < ActiveRecord::Migration[6.0]
  def up
    execute 'CREATE TABLE complex_buildings (units int4) INHERITS (assets);'
  end

  def down
    execute 'DROP TABLE complex_buildings;'
  end
end

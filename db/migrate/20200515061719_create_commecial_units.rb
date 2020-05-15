class CreateCommecialUnits < ActiveRecord::Migration[6.0]
  def up
    execute 'CREATE TABLE commecial_units (shops int4, parking int4 ) INHERITS (assets);'
  end

  def down
    execute 'DROP TABLE commecial_units;'
  end
end

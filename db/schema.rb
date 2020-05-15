# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_15_061719) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "timescaledb"

  create_table "assets", force: :cascade do |t|
    t.string "owner"
    t.string "address"
    t.integer "sqmt"
    t.decimal "price"
    t.string "type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "commecial_units", id: false, force: :cascade do |t|
    t.bigint "id", default: -> { "nextval('assets_id_seq'::regclass)" }, null: false
    t.string "owner"
    t.string "address"
    t.integer "sqmt"
    t.decimal "price"
    t.string "type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "shops"
    t.integer "parking"
  end

  create_table "complex_buildings", id: false, force: :cascade do |t|
    t.bigint "id", default: -> { "nextval('assets_id_seq'::regclass)" }, null: false
    t.string "owner"
    t.string "address"
    t.integer "sqmt"
    t.decimal "price"
    t.string "type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "units"
  end

  create_table "houses", id: false, force: :cascade do |t|
    t.bigint "id", default: -> { "nextval('assets_id_seq'::regclass)" }, null: false
    t.string "owner"
    t.string "address"
    t.integer "sqmt"
    t.decimal "price"
    t.string "type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "rooms"
    t.integer "floors"
    t.boolean "air_cond"
  end

end

# Example Auth
admin = User.new
admin.email = 'admin@rem.test'
admin.password = 'password'
admin.password_confirmation = 'password'
admin.save!

user = User.new
user.email = 'user@rem.test'
user.password = 'password'
user.password_confirmation = 'password'
user.save!

SAMPLE_HOUSE = [{
  owner: 'Mario Rossi',
  address: 'Via Adriano, 110 - 20128 Milano (MI)',
  sqmt: 120,
  price: 140000.00,
  rooms: 4,
  floors: 2,
  air_cond: false
}]

SAMPLE_COMPLEX_BUILDING = [{
  owner: 'Mario Corti',
  address: 'Via Gregorio VII, 53 - 00165 Roma (RM)',
  sqmt: 980,
  price: 790_000.00,
  units: 8
}]

SAMPLE_COMMECIAL_UNIT = [{
  owner: 'Luca Verdi',
  address: 'Via Milazzo, 11/A - 40121 Bologna (BO)',
  sqmt: 180,
  price: 290_000.00,
  shops: 2,
  parking: 6
}]

SAMPLE_HOUSE.each do |house|
  House.create(house)
  House.first.images.attach(
    io: File.open('./db/images/house01.jpeg'),
    filename: 'house01.jpeg',
    content_type: 'image/jpeg'
  )
  House.first.images.attach(
    io: File.open('./db/images/house02.jpeg'),
    filename: 'house02.jpeg',
    content_type: 'image/jpeg'
  )
  House.first.images.attach(
    io: File.open('./db/images/house03.jpeg'),
    filename: 'house03.jpeg',
    content_type: 'image/jpeg'
  )
end

SAMPLE_COMPLEX_BUILDING.each do |complex|
  ComplexBuilding.create(complex)
  ComplexBuilding.first.images.attach(
    io: File.open('./db/images/building01.png'),
    filename: 'building01.png',
    content_type: 'image/png'
  )
end

SAMPLE_COMMECIAL_UNIT.each do |commecial|
  CommecialUnit.create(commecial)
  CommecialUnit.first.images.attach(
    io: File.open('./db/images/commecial01.jpeg'),
    filename: 'commecial01.jpeg',
    content_type: 'image/jpeg'
  )
  CommecialUnit.first.images.attach(
    io: File.open('./db/images/commecial02.jpg'),
    filename: 'commecial02.jpeg',
    content_type: 'image/jpeg'
  )
end
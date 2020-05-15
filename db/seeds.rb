SAMPLE_HOUSE = [{
  owner: 'Aldo Ropelato',
  address: 'Via Magni 19, Inverigo 22044 (CO) ',
  sqmt: 120,
  price: 140000.00,
  rooms: 4,
  floors: 2,
  air_cond: false
},{
    owner: 'Efrem Ropelato',
  address: 'Via G. Parini 13, Monguzzo 22040 (CO) ',
  sqmt: 150,
  price: 175000.00,
  rooms: 6,
  floors: 3,
  air_cond: false
}, {
    owner: 'Roberta Giussani',
  address: 'Via G. Parini 13, Monguzzo 22040 (CO) ',
  sqmt: 110,
  price: 120000.00,
  rooms: 6,
  floors: 2,
  air_cond: true
}]

SAMPLE_COMPLEX_BUILDING = [{
  owner: 'Enrica Corti',
  address: 'Via Magni 14, Inverigo 22044 (CO) ',
  sqmt: 980,
  price: 790000.00,
  units: 8
}]

SAMPLE_COMMECIAL_UNIT = [{
  owner: 'Mario Tanzi',
  address: 'Via Magni 54, Inverigo 22044 (CO) ',
  sqmt: 180,
  price: 290000.00,
  shops: 2,
  parking: 6
}]

SAMPLE_HOUSE.each do |house|
  House.create(house)
end

SAMPLE_COMPLEX_BUILDING.each do |complex|
  ComplexBuilding.create(complex)
end

SAMPLE_COMMECIAL_UNIT.each do |commecial|
  CommecialUnit.create(commecial)
end
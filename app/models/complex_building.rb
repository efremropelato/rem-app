class ComplexBuilding < Asset
  has_many_attached :images
  self.primary_key = 'id'
  def self.base_class
    self
  end

  def self.find(id)
    find_by_id(id)
  end
end

class ComplexBuilding < Asset
  self.primary_key = "id"
    def self.base_class
        self
      end
            
    def self.find(id)
      self.find_by_id(id)
    end
end

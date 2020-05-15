class Asset < ApplicationRecord
  def self.base_class
    self
  end

  def as_json(options = {})
    json = super
    json['type'] = type
    return json
  end

end

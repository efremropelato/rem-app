class VeryLongTaskJob < ApplicationJob
  queue_as :default

  # call this method when you have to perform the very long task
  def perform(klassName, id, asset)
    sleep 60
    asset.update(buyed: true)
    ActionCable.server.broadcast('assets_channel', 
      {'action':'buy', 'type': klassName, 'asset': id, 'data': asset.to_json })
    true # cause the task did complete correctly
  end
end

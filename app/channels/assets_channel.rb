class AssetsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "assets_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

class Api::V1::AssetsController < ApplicationController
  before_action :set_klass, only: [:getimages, :postimages]

  def index
    render json: Asset.all
  end

  def create
    render json: Asset.create(asset_params)
  end

  def show
    render json: Asset.find(params[:id])
  end

  def getimages
    asset = @klass.find(params[:id])
    render json: asset.images.all.map { |img| Rails.application.routes.url_helpers.rails_blob_path(img, only_path: true) }
  end

  def postimages
    asset = @klass.find(params[:id])
    files = params[:files]
    (files || []).each do |img|
      asset.images.attach(
        io: File.open(img.to_io),
        filename: img.original_filename,
        content_type: img.content_type
      )
    end
    head :ok
  end

  def update
    asset = Asset.find(params[:id])
    asset.update(asset_params)
    render json: asset
  end

  def destroy
    Asset.destroy(params[:id])
    head :ok
  end

  private

  def set_klass
    @klass = Object.const_get params[:klassName]
  end

  def asset_params
    params.permit(:owner, :address, :sqmt, :price)
  end
end

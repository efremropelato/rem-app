class Api::V1::AssetsController < ApplicationController
  def index
    all_assets = Asset.all
    render json: all_assets
  end

  def create
    asset = Asset.create(asset_params)
    render json: asset
  end

  def show
    asset = Asset.find(params[:id])
    render json: asset
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

  def asset_params
    params.permit(:owner, :address, :sqmt, :price)
  end
end

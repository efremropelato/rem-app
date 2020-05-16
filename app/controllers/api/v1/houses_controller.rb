class Api::V1::HousesController < ApplicationController
    def index
        all_houses = House.all
        render json: all_houses
      end
    
      def create
        house = House.create(house_params)
        ActionCable.server.broadcast('assets_channel', 
          {'action':'create', 'type': 'House', 'asset': house.id, 'data': house.to_json })
        render json: house
      end
    
      def show
        house = House.find(params[:id])
        render json: house
      end
    
      def update
        house = House.find(params[:id])
        house.update(house_params)
        ActionCable.server.broadcast('assets_channel', 
          {'action':'update', 'type': 'House', 'asset': params[:id], 'data': house.to_json })
        render json: house
      end
    
      def destroy
        House.destroy(params[:id])
        ActionCable.server.broadcast('assets_channel', 
          {'action':'destroy', 'type': 'House', 'asset': params[:id], 'data': nil })
        head :ok
      end
    
      private
    
      def house_params
        params.permit(:owner, :address, :sqmt, :price, :rooms, :floors, :air_cond, images: [])
      end
end

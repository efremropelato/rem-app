class Api::V1::HousesController < ApplicationController
    def index
        all_houses = House.all
        render json: all_houses
      end
    
      def create
        house = House.create(house_params)
        render json: house
      end
    
      def show
        house = House.find(params[:id])
        render json: house
      end
    
      def update
        house = House.find(params[:id])
        house.update(house_params)
        render json: house
      end
    
      def destroy
        House.destroy(params[:id])
        head :ok
      end
    
      private
    
      def house_params
        params.permit(:owner, :address, :sqmt, :price, :rooms, :floors, :air_cond)
      end
end

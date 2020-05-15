class Api::V1::ComplexBuildingsController < ApplicationController
    def index
        all_complexBuildings = ComplexBuilding.all
        render json: all_complexBuildings
      end
    
      def create
        complexBuilding = ComplexBuilding.create(complexBuilding_params)
        render json: complexBuilding
      end
    
      def show
        complexBuilding = ComplexBuilding.find(params[:id])
        render json: complexBuilding
      end
    
      def update
        complexBuilding = ComplexBuilding.find(params[:id])
        complexBuilding.update(complexBuilding_params)
        render json: complexBuilding
      end
    
      def destroy
        ComplexBuilding.destroy(params[:id])
        head :ok
      end
    
      private
    
      def complexBuilding_params
        params.permit(:owner, :address, :sqmt, :price, :units)
      end
end

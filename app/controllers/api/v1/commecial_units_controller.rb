class Api::V1::CommecialUnitsController < ApplicationController
    def index
        all_commecialUnits = CommecialUnit.all
        render json: all_commecialUnits
      end
    
      def create
        commecialUnit = CommecialUnit.create(commecialUnit_params)
        render json: commecialUnit
      end
    
      def show
        commecialUnit = CommecialUnit.find(params[:id])
        render json: commecialUnit
      end
    
      def update
        commecialUnit = CommecialUnit.find(params[:id])
        commecialUnit.update(commecialUnit_params)
        render json: commecialUnit
      end
    
      def destroy
        CommecialUnit.destroy(params[:id])
        head :ok
      end
    
      private
    
      def commecialUnit_params
        params.permit(:owner, :address, :sqmt, :price, :shops, :parking)
      end
end

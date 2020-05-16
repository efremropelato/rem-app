# frozen_string_literal: true

class MainController < ApplicationController
  layout 'main'

  def index
    @main_props = { currentUser: current_user , userSession: user_session }
  end
end

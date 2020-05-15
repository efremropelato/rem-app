# frozen_string_literal: true

class MainController < ApplicationController
  layout 'main'

  def index
    @main_props = { appName: 'Real Estate Management' }
  end
end

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # :registerable, :rememberable, :recoverable,
  devise :database_authenticatable, :validatable, :rememberable
end

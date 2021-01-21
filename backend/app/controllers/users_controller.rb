class UsersController < ApplicationController
  skip_before_action :logged_in?, only: [:create, :log_in]
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    @users = User.all
    render json: @users
  end

  def show
    render json: @user
  end

  def create
    @user = User.new(user_params)
    if @user && @user.valid
      @user.save
      render json: {user: @user, token: JWT.encode({user_id: @user.id}, 'Hide this secret!')}, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def log_in
    @user = User.find_by(username: params[:username])
    if @user && @user.authenticate(params[:password])
      render json: {user: @user, token: JWT.encode({user_id: @user.id}, 'Hide this secret!')}
    else
      render json: {error: 'Invalid creditials.'}
    end
  end

  def get_user
    @user = self.current_user
    render json: @user
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
  end

  private
  
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:email, :username, :password)
    end

end

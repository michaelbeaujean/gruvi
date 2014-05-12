class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      flash[:message] = "You've created an account!"
      redirect_to @user
    else
      flash[:message] = "Something went wrong!"
      redirect_to root_path
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

    @user.update(
      name: params[:user][:name],
      email: params[:user][:email]
      )

    flash[:message] = "Your account has been updated!"
    redirect_to user_path(@user)
  end

  def destroy
    user = User.find(params[:id])
    user.destroy

    flash[:message] = "You've deleted your account :("
    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :password,
      :password_confirmation
      )
  end
end

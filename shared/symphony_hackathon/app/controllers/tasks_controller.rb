class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy]
  respond_to :json

  def index
    if params[:point].present?
      @tasks = Task.within(50, origin: [params[:point][:ltd].to_f, params[:point][:lng].to_f])
    else
      @tasks =  Task.all
    #if params[:search].present?
    #  respond_with Task.includes(:user).near(params[:search], 50)
    #else
    #  respond_with Task.includes(:user).all
    end

  end

  def show
  end

  def create
    @task = Task.create(task_params)
  end

  def update
    if @task.update(task_params)
      respond_with @task
    else
      respond_with @task.errors
    end
  end

  def destroy
    respond_with @task.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.includes(:user).find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def task_params
      params.require(:point).permit(:title, :description, :ltd, :lng, :actual_to, :actual_from, :user)
    end
end

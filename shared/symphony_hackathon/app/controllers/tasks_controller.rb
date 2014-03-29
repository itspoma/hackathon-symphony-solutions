class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy]
  respond_to :json

  # GET /tasks
  # GET /tasks.json
  def index
    if params[:search].present?
      respond_with Task.includes(:user).near(params[:search], 50)
    else
      respond_with Task.includes(:user).all
    end

  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = Task.new(task_params)

    respond_to do |format|
      if @task.save
        respond_with @task 
      else
        respond_with @task.errors
      end
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    respond_to do |format|
      if @task.update(task_params)
        respond_with @task
      else
        respond_with @task.errors
      end
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    respond_with @task.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      respond_with Task.includes(:user).find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def task_params
      params.require(:point).permit(:title, :description, :ltd, :lng, :actual_to, :actual_from, :user)
    end
end

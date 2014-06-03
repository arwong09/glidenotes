module Api
  class BoardsController < ApiController
    def index
      @boards = Board.includes(:lists, :cards).all
      
      respond_to do |format|
        format.html { render :index }
        format.json { render "api/boards/index" }
      end
    end

    def show
      @board = Board.find(params[:id])
      render partial: "api/boards/board", locals: { board: @board }
    end

    def create
      @board = Board.new(board_params)
      if @board.save
        render partial: "api/boards/board", locals: { board: @board }
      else
        render json: { errors: @board.errors.full_messages }, status: 422
      end
    end

    def update
      
      @board = Board.find(params[:id])
          
      if @board.update_attributes(board_params)
        render partial: "api/boards/board", locals: { board: @board }
      else
        render json: { errors: @board.errors.full_messages }, status: 422
      end
    end 

    def destroy
     Board.find(params[:id]).try(:destroy)
      render json: {}
    end

    private
    def board_params
      params.require(:board).permit(:title)
    end
  end
end

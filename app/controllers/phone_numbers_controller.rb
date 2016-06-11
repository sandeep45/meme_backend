class PhoneNumbersController < ApplicationController

    skip_before_filter :verify_authenticity_token

  # GET /phone_numbers
  # GET /phone_numbers.json
  def index
    @phone_numbers = PhoneNumber.where("1=1")
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @phone_numbers.includes(:messages).to_json(:include => [:messages]) }
    end
  end

  # GET /phone_numbers/1
  # GET /phone_numbers/1.json
  def show
    @phone_number = PhoneNumber.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @phone_number.to_json(:include => [:messages]) }
    end
  end

  # GET /phone_numbers/new
  # GET /phone_numbers/new.json
  def new
    @phone_number = PhoneNumber.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @phone_number }
    end
  end

  # GET /phone_numbers/1/edit
  def edit
    @phone_number = PhoneNumber.find(params[:id])
  end

  # POST /phone_numbers
  # POST /phone_numbers.json
  def create
    sleep 5
    @phone_number = PhoneNumber.new(params[:phone_number])

    respond_to do |format|
      if @phone_number.save
        format.html { redirect_to @phone_number, notice: 'Phone book was successfully created.' }
        format.json { render json: @phone_number.to_json(:include => [:messages]),
          status: :created, location: @phone_number }
      else
        format.html { render action: "new" }
        format.json { render json: @phone_number.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /phone_numbers/1
  # PUT /phone_numbers/1.json
  def update
    @phone_number = PhoneNumber.find(params[:id])

    respond_to do |format|
      if @phone_number.update_attributes(params[:phone_number])
        format.html { redirect_to @phone_number, notice: 'Phone book was successfully updated.' }
        format.json { head @phone_number.to_json(:include => [:messages]) }
      else
        format.html { render action: "edit" }
        format.json { render json: @phone_number.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /phone_numbers/1
  # DELETE /phone_numbers/1.json
  def destroy
    @phone_number = PhoneNumber.find(params[:id])
    @phone_number.destroy

    respond_to do |format|
      format.html { redirect_to phone_numbers_url }
      format.json { head :no_content }
    end
  end
end

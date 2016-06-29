class ApiController < ActionController::Base

  skip_before_filter :verify_authenticity_token

  def search
    response = RestClient.get "http://version1.api.memegenerator.net/Generators_Search",
      {
        :params => {
          :q => params[:q],
          :pageIndex => 0,
          :pageSize => 12
        }
      }
    render :json => response.body
  end

  def build
    response = RestClient.get "http://version1.api.memegenerator.net/Instance_Create",
      {
        :params => {
           :username => "sandeep45",
           :password => "123Mock123!",
           :languageCode => "en",
           :text0 => params[:text0],
           :text1 => params[:text1],
           :imageID => params[:imageId],
           :generatorID => params[:generatorId]
        }
      }
    render :json => response.body
  end

  def send_message
    account_sid = "ACe241c3e42dbde05f17d23cde7ac62669"
    auth_token = "662b52126666dd8b008deca7fd2ee6e8"

    client = Twilio::REST::Client.new account_sid, auth_token

    from = "+16312464608" # Your Twilio number

    resp = client.account.messages.create(
      :from => from,
      :callerID => "6318137738",
      :to => params[:to],
      :body => "From Sandeep",
      :media_url => params[:media_url]
    )

    render :json => {:success => true}
  end

  def sms_reply
    puts "*****"
    puts params
    puts "*****"

    body = params["Body"]
    to = params["To"]
    from = params["From"]

    from = from[2..from.length] if from.index("+1") == 0

    p = PhoneNumber.find_by_number(from)
    p.messages.create :body => body, :direction => "incomming"

    render :nothing => true, :status => 200
  end

end

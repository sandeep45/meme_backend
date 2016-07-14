import React, { PropTypes, Component } from 'react'
import SendButton from '../containers/SendButton.js'

class MessageForm extends Component {

  constructor(props){
    super(props);
  };

  render(){
    const {to, name, text, tag} = this.props;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Create Message
        </div>
        <div className="panel-body">
          <form>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" rows="3" id="message"
                value={text}
                placeholder="Type message here"
                ref={(c) => this._text = c}
                onChange={this._updateText}
              />
            </div>

            <div className="form-group">
              <label htmlFor="tag">
                Tag {""}
                <small onClick={this._updateTagWithPrePopChoice}>
                  ( e.g.{" "}
                    <a href="javascript:void(0);">trump</a>{""},{" "}
                    <a href="javascript:void(0);">food</a>{""},{" "}
                    <a href="javascript:void(0);">cat</a>{""},{" "}
                    <a href="javascript:void(0);">chilling</a>{""},{" "}
                    <a href="javascript:void(0);">smoking</a>{""},{" "}
                    <a href="javascript:void(0);">running</a>{""},{" "}
                    <a href="javascript:void(0);">excited</a>{""},{" "}
                    <a href="javascript:void(0);">surprise</a>{""},{" "}
                    <a href="javascript:void(0);">guns</a>{""},{" "}
                    <a href="javascript:void(0);">africa</a>{""},{" "}
                    <a href="javascript:void(0);">obama</a>{" "},{" "}
                    <a href="javascript:void(0);">flava flav</a>{" "},{" "}
                    <a href="javascript:void(0);">tired</a>{" "},{" "}
                    <a href="javascript:void(0);">serious</a>{" "},{" "}
                    <a href="javascript:void(0);">angry</a>{" "},{" "}
                    <a href="javascript:void(0);">upset</a>{" "},{" "}
                    <a href="javascript:void(0);">busy</a>{" "}

                  )
                </small>
              </label>
              <input type="text" className="form-control" id="tag"
                ref={(c) => this._tag = c}
                value={tag}
                onChange={this._updateTag}
              />
            </div>

            {this._putNotificationScreen()}
            {this._putErrorScreen()}

            <SendButton />

          </form>
        </div>
      </div>
    );
  };

  _updateName = (evt) => {
    const {updateMessage} = this.props;
    console.log(evt.target.value);
    updateMessage({name: evt.target.value});
  };

  _updateTo = (evt) => {
    const {updateMessage} = this.props;
    console.log(evt.target.value);
    updateMessage({to: evt.target.value});
  };

  _updateText = (evt) => {
    const {updateMessage} = this.props;
    console.log(evt.target.value);
    updateMessage({text: evt.target.value});
  };

  _updateTag = (evt) => {
    const {updateMessage} = this.props;
    console.log(evt.target.value);
    updateMessage({tag: evt.target.value});
    this.props.searchMemeTemplates(this._tag.value);
  };

  _updateTagWithPrePopChoice = (evt) => {
    this._tag.value = evt.target.innerText;
    this._updateTag({target: { value: evt.target.innerText } });
  }

  _putNotificationScreen = () => {
    if(this.props.showNotification == true){
      return (
        <p className="bg-success" style={{padding: "10px"}}>Message has been Sent !</p>
      );
    }else{
      return ""
    }
  }

  _putErrorScreen = () => {
    if(this.props.showErrorNotification == true){
      return (
        <p className="bg-danger" style={{padding: "10px"}}>Failure! {this.props.errorMessage}</p>
      );
    }else{
      return ""
    }
  }
};

MessageForm.propTypes = {
  to: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  searchMemeTemplates: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  showNotification: PropTypes.bool.isRequired,
  showErrorNotification: PropTypes.bool.isRequired
};

export default MessageForm;
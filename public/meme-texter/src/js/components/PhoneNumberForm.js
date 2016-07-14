import React, { PropTypes, Component } from 'react'

import MessageNotification from '../containers/MessageNotification.js'

class PhoneNumberForm extends Component {
  constructor(props){
    super(props)
  };

  render(){
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          Add New Phone Number
        </div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label for="newName">Name</label>
              <input type="text" className="form-control" id="newName"
                ref={(c) => this._name = c} />
            </div>
            <div className="form-group">
              <label for="newNumber">Number</label>
              <input type="text" className="form-control" id="newNumber"
                ref={(c) => this._number = c} />
            </div>
            <MessageNotification  heading="Added!" body="Phone Number has been added"  />
            <div className="btn-toolbar" role="toolbar" aria-label="...">
              <input type="button" className="btn btn-primary" value="Add"
                onClick={this._onSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    );
  };

  _onSubmit = (evt) => {
    this.props.addPhoneNumber(this._name.value, this._number.value);
    this._name.value="";
    this._number.value="";
    this.props.flashTheNotification();
  }
};

PhoneNumberForm.propTypes = {
  addPhoneNumber: PropTypes.func.isRequired,
  flashTheNotification: PropTypes.func.isRequired
};

export default PhoneNumberForm;


import React, { PropTypes, Component } from 'react';

class AddNewPhoneNumber extends Component {
  constructor(props){
    super(props)
  };

  render(){
    const {phoneNumber,saveNumber} = this.props;

    return(
      <div className="panel panel-default" ref={(c) => this._addBox = c}>
      <div className="panel-body">
        <p className="text-primary">
          Phone number: <mark>{phoneNumber}</mark> looks new! Give it a name and we will save it.
        </p>

        <div className="input-group">
          <input type="text" className="form-control" placeholder="Type Name Here"
            ref={c => this._name = c}/>
          <span className="input-group-btn">
            <button type="submit" className="btn btn-default" onClick={this._saveClicked}>
              Save
            </button>
          </span>
        </div>

      </div>
    </div>
    );
  };

  _saveClicked = (evt) => {
    console.log("Save has been clicked: ", this._name.value, this.props.phoneNumber);
    if(this._name.value && this._name.value.length > 0){
      this.props.saveNumber(this._name.value, this.props.phoneNumber);
    }
  }

}

AddNewPhoneNumber.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  saveNumber: PropTypes.func.isRequired
};

export default AddNewPhoneNumber;
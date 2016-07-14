import React, { PropTypes, Component } from 'react'
import {connect} from 'react-redux'

import PhoneNumberListGroup from '../components/PhoneNumberListGroup'
import AddNewPhoneNumber from '../components/AddNewPhoneNumber'
import * as actions from '../actions/'
import * as selectors from '../reducers/'

const mapStateToProps = (state, ownProps) => {
  return {
    searchedPhonePhrase: selectors.getSearchedPhonePhrase(state),
    phoneNumbersFilteredByPhrase: selectors.getPhoneNumbersFilteredByPhrase(state),
    selectedPhoneNumber: selectors.getSelectedPhoneNumber(state),
    searchedDropDownClicked: selectors.getPhoneNumberDropDownClicked(state),
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    doSearch: (phrase) => {
      dispatch(actions.searchPhoneNumbers(phrase));
    },
    updatedSearchedPhonePhrase: (phrase) => {
      dispatch(actions.updatedSearchedPhonePhrase(phrase));
    },
    saveNumber: (name, number) => {
      dispatch(actions.addNumber(name, number)).then(
        () => {
          dispatch(actions.searchPhoneNumbers(number));
        }
      )
      dispatch(actions.markDropDownValueSelected());
      dispatch(actions.updateMessage({name, to: number}));
    },
    onSelectionOfNumber: (name, to) => {
      dispatch(actions.markDropDownValueSelected());
      dispatch(actions.updateMessage({name, to}));
      dispatch(actions.updatedSearchedPhonePhrase(name));
      dispatch(actions.searchPhoneNumbers(to));
    },
    markDropDownValueUnSelected: () => {
      dispatch(actions.markDropDownValueUnSelected());
    }
  };
}

class PhoneNumberSearchAndSave extends Component {
  constructor(props){
    super(props);
  };
  render(){
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Select Recipient
        </div>
        <div className="panel-body">
          <input type="text" className="form-control" placeholder="Type phone number here"
            onChange={this._doSearch} value={this.props.searchedPhonePhrase}
            onKeyDown={this._keyDownHandler}
            ref={c => this._searchBox = c}
          />
          {this._putPhoneNumberDropDownScreen()}
          {this._putAddScreen()}
        </div>
      </div>
    );
  };
  _doSearch = (evt) => {
    console.log("you entered: ", evt.target.value, this._searchBox.value);
    this.props.doSearch(this._searchBox.value);
    this.props.updatedSearchedPhonePhrase(this._searchBox.value);
  };
  _putPhoneNumberDropDownScreen = () => {
    if(this.props.searchedDropDownClicked == false){
      return (
        <PhoneNumberListGroup
          phoneNumbers={this.props.phoneNumbersFilteredByPhrase}
          onSelectionOfNumber={this.props.onSelectionOfNumber}
          selectedPhoneNumber={this.props.selectedPhoneNumber}
        />
      );
    }
  };
  _putAddScreen = () => {
    if(this.props.searchedPhonePhrase &&
      this.props.searchedPhonePhrase.length == 10 &&
      this.props.phoneNumbersFilteredByPhrase.length == 0 )
    return (
      <AddNewPhoneNumber
        phoneNumber={this.props.searchedPhonePhrase}
        saveNumber={this.props.saveNumber}
      />
    );
  };
  _keyDownHandler = (evt) => {
    if(evt.keyCode == 38){
      console.log("move up");
    }else if(evt.keyCode == 40){
      console.log("move down");
    };
    this.props.markDropDownValueUnSelected()
  }
}

PhoneNumberSearchAndSave.propTypes = {
  doSearch: PropTypes.func,
  searchedPhonePhrase: PropTypes.string.isRequired,
  updatedSearchedPhonePhrase: PropTypes.func.isRequired,
  phoneNumbersFilteredByPhrase: PropTypes.array
}

PhoneNumberSearchAndSave.defaultProps = {
  doSearch: (phrase) => { console.log("UI asked to do search on ", phrase) },
  phoneNumbersFilteredByPhrase: []
}


PhoneNumberSearchAndSave = connect(mapStateToProps, mapDispatchToProps)(PhoneNumberSearchAndSave);

export default PhoneNumberSearchAndSave;
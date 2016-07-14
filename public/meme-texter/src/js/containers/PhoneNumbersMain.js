import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {addNumber} from '../actions'

import PhoneNumberList from '../components/PhoneNumberList.js'
import PhoneNumberForm from '../components/PhoneNumberForm.js'

import {updateMessage, initiatePhoneNumberDeletion,
  flashTheNotification, fetchPhoneNumbers} from '../actions'

const mapStateToProps = (state, ownProps) => {

  return {
    phoneNumbers: _.values(state.entities.phoneNumbers),
    selectedPhoneNumber: state.message.to,
    showNotification: state.message.showNotification
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectionOfNumber: (name, number) => {
      dispatch(updateMessage({name, to: number}))
    },
    onDeleteOfNumber: (id) => {
      dispatch(initiatePhoneNumberDeletion(id));
    },
    refresh: () => {
      dispatch(fetchPhoneNumbers());
    },
    addPhoneNumber: (name, number) => {
      dispatch(addNumber(name, number));
    },
    flashTheNotification: () => {
      dispatch(flashTheNotification());
    }
  }
};

let PhoneNumbersMain = (props) => {
  return(
    <div className="panel panel-default">
      <div className="panel-heading">
        Phone Numbers Main
      </div>
      <div className="panel-body">
        <PhoneNumberList {...props} />
        <PhoneNumberForm {...props} />
      </div>
    </div>
  );
};

PhoneNumbersMain = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneNumbersMain);

export default PhoneNumbersMain;


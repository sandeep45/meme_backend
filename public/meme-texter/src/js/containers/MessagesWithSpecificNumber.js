import { connect } from 'react-redux'
import React, { PropTypes, Component } from 'react'

import MessageList from '../components/MessageList.js'
import {fetchMessages} from '../actions'
import * as helpers from '../config/helpers'
import _ from "lodash";

class MessagesWithSpecificNumber extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const selectedPhoneNumber = this.props.params.phone_number;
    console.log("component mounted " + selectedPhoneNumber);;
    this._loadData(selectedPhoneNumber);
  }

  componentWillReceiveProps(nextProps) {
    const selectedPhoneNumber = this.props.params.phone_number;
    const newPhoneNumberPassed = nextProps.params.phone_number;
    console.log("component will receive NEW props " + nextProps.params.phone_number);
    if(newPhoneNumberPassed != selectedPhoneNumber){
    this._loadData(newPhoneNumberPassed);
    }
  }

  _loadData(phoneNumber){
    console.log("[Optional]asked to load data for: " + phoneNumber);
  };

  render(){
    return(
      <MessageList {...this.props} />
    );
  };
}

const mapStateToProps = (state, ownProps) => {

  const selectedPhoneNumber = ownProps.params.phone_number;
  const allNumbers = _.values(state.entities.phoneNumbers)

  const selectedPhoneNumberRecord = helpers.getRecordByAttributeAndValue(
    allNumbers, "number", selectedPhoneNumber
  );

  const associatedMessagIds = selectedPhoneNumberRecord.messages || []

  return {
    caption: `Messages with ${selectedPhoneNumberRecord.number}`,
    messages: associatedMessagIds.map(id => state.entities.messages[id]).sort((a,b) => b.id - a.id),
    phoneNumbers: allNumbers
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    refresh: () => {
      dispatch(fetchMessages());
    }
  }
};

MessagesWithSpecificNumber = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesWithSpecificNumber);

export default MessagesWithSpecificNumber;


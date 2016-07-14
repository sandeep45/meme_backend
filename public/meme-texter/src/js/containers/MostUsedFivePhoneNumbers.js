import { connect } from 'react-redux'
import _ from 'lodash'

import PhoneNumberList from '../components/PhoneNumberList.js'

import {updateMessage, initiatePhoneNumberDeletion, fetchPhoneNumbers} from '../actions'

const mapStateToProps = (state, ownProps) => {

  return {
    phoneNumbers: _.values(state.entities.phoneNumbers).sort((a,b) => b.messages.length - a.messages.length).slice(0,5),
    selectedPhoneNumber: state.message.to
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
    }
  }
};

const MostUsedFivePhoneNumbers = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneNumberList);

export default MostUsedFivePhoneNumbers;


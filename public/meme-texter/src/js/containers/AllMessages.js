import { connect } from 'react-redux'
import _ from 'lodash'

import MessageList from '../components/MessageList.js'
import {updateMessage, initiatePhoneNumberDeletion, fetchMessages} from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    messages: _.values(state.entities.messages).sort((a,b) => b.id - a.id),
    phoneNumbers: _.values(state.entities.phoneNumbers)
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    refresh: () => {
      dispatch(fetchMessages());
    }
  }
};

const AllMessages = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);

export default AllMessages;


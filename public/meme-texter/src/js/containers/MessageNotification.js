import { connect } from 'react-redux'

import Notification from '../components/Notification.js'

const mapStateToProps = (state, ownProps) => {
  const {text} = state.message;
  return {
    showNotification:state.message.showNotification
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { }
};

const MessageNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);

export default MessageNotification;


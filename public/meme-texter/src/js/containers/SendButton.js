import React, { PropTypes, Component } from 'react'

import { connect } from 'react-redux'

import {doSendingOfMessage} from '../actions/'

const mapStateToProps = (state, ownProps) => {
  return { };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickOfSendButton: () => {
      console.log("send button has been clicked. doing sending of message ");
      dispatch(doSendingOfMessage());
    }
  }
};

let SendButton = (props) => {
  const {onClickOfSendButton} = props;

  return (
    <button className="top-send-button" type="button"
      className="btn btn-success pull-right"
      onClick={onClickOfSendButton}>
        Send <span className="glyphicon glyphicon-send"></span>
    </button>
  );
}

SendButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(SendButton);

export default SendButton;


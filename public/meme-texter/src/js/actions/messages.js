import axios from "axios";
import _ from "lodash";

import K from "../constants/"
import { getAllMessages, addMessage } from "../config/WebUtil.js"

export const receiveNewMessage = (response) => {
  return {
    type: K.RECEIVE_NEW_MESSAGE,
    response
  }
};

export const receiveMessages = (response) => {
  return {
    type: K.RECEIVE_MESSAGES,
    response
  }
};

export const addNewMessage = () => {
  return (dispatch, getState) => {
    const state = getState();

    const body = state.message.instanceImageUrl;
    const tag = state.message.tag;
    const text = state.message.text;
    const direction = "outgoing";
    const phone_number_id = _.values(state.entities.phoneNumbers).find( item => item.number == state.message.to ).id

    addMessage(body, direction, phone_number_id, tag, text).then(
      (response) => {
        dispatch(receiveNewMessage(response))
      },
      (response) => {
        alert("failed to add number: ", response);
      }
    );
  }
};

export const fetchMessages = () => {
  return (dispatch) => {
    getAllMessages().then(
      (response) => {
        dispatch(receiveMessages(response))
      },
      (response) => {
        alert("failed to fetch messages: ", response);
      }
    );
  }
};



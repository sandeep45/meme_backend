import axios from "axios";

import K from "../constants/"
import { getVariousImages, build, send } from "../config/WebUtil.js"
import {splitTextInToTwo} from '../config/helpers.js'
import { addNewMessage } from "./messages.js"
import { addNumber } from "./phoneNumber.js"

export const flashTheNotification = () => {
  return (dispatch) => {
    dispatch({
      type: K.SHOW_NOTIFICATION
    });
    window.setTimeout(() => {
      dispatch({
        type: K.HIDE_NOTIFICATION
      });
    }, 5000);
  }
}

export const flashErrorNotification = (message) => {
  return (dispatch) => {
    dispatch({
      type: K.SHOW_ERROR_NOTIFICATION,
      message
    });
    window.setTimeout(() => {
      dispatch({
        type: K.HIDE_ERROR_NOTIFICATION
      });
    }, 5000);
  }
}

export const updateMessage = (attributes) => {
  return {
    type: K.UPDATE_MESSAGE,
    attributes
  }
};

export const updateVariousImages = (variousImages) => {
  return {
    type: K.UPDATE_VARIOUS_IMAGES,
    variousImages
  }
};

export const updateInstanceImageUrl = (instanceImageUrl) => {
  return {
    type: K.UPDATE_INSTANCE_IMAGE_URL,
    instanceImageUrl
  }
};

export const updateSelectedPreviewItem = (imageId, generatorId) => {
  return {
    type: K.UPDATE_SELECTED_PREVIEW_ITEM,
    imageId,
    generatorId
  }
}

export const doSearch = (tag) => {
  let thunk = (dispatch) => {

    return getVariousImages(tag).then(
      (data) => {
        dispatch(updateVariousImages(data));
      },
      (errorMessage) => {
        alert(`error searching: ${errorMessage}`);
      }
    )
  };
  thunk.meta = {
    debounce: {
      time: 250,
      key: 'doSearch'
    }
  };
  return thunk;
};

export const buildInstance = (imageId, generatorId, text0, text1) => {
  return (dispatch, getState) => {
    const state = getState();
    const {to} = state;
    return build(imageId, generatorId, text0, text1);
  }
};

export const doSendingOfMessage = () => {
  return (dispatch, getState) => {
    const state = getState();

    const {imageId, generatorId} = state.message.selectedPreviewItem;
    const {to, name, text} = state.message;
    const [text0, text1] = splitTextInToTwo(text);

    if(!to || to.length != 10){
      return dispatch(flashErrorNotification("Phone Number needed."));
    }

    dispatch(
      buildInstance(imageId, generatorId, text0, text1)
    ).
    then(
      (response) => {
        dispatch(updateInstanceImageUrl(response));
        // return Promise.resolve()
        return send(to, response)
      },
      (response) => {
        return Promise.reject("Please select a Meme.");
      }
    ).
    then(
      (response) => {
        console.log("about to add number");
        return dispatch(addNumber(name, to));
      },
      (response) => {
        return Promise.reject(response);
      }
    ).
    then(
      (response) => {
        console.log("about to add new message: ", response);
        dispatch(addNewMessage());
        dispatch(flashTheNotification());
      }
    ).catch(
      (response) => {
        dispatch(flashErrorNotification(response));
      }
    )


  }
}


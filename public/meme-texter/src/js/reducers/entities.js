import merge from 'lodash/merge'
import K from "../constants/"

const initialSate = {
  messages: {},
  phoneNumbers: {}
};

const entities = (state=initialSate, action) => {
  if(action.response && action.response.entities) {
    return merge( {} , state, action.response.entities);
  }else{
    return deleteHandlingReducer(state, action)
  }
}

const deleteHandlingReducer = (state=initialSate, action) => {
  switch(action.type){
    case K.SUCCESS_DELETE_PHONE_NUMBER:
      let newState = Object.assign({}, state);
      delete newState.phoneNumbers[action.id]
      return newState;
    default:
      return state;
  }
}

export default entities

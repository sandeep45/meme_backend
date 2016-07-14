import K from "../constants/"

const initialSate = "";

const serachedPhonePhrase = (state=initialSate, action) => {

  switch(action.type){
    case K.UPDATE_SEARCHED_PHONE_PHRASE:
      return action.phrase;

    default:
      return state
  };

}

export default serachedPhonePhrase

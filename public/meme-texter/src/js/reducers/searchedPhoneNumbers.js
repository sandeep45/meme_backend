import K from "../constants/"

const initialSate = { };

const searchedPhoneNumbers = (state=initialSate, action) => {

  switch(action.type){
    case K.SEARCH_PHONE_NUMBERS_SUCCESS:
      return Object.assign({}, state, {
        [action.response.phrase]: action.response.result
      });

    default:
      return state
  };

}

export default searchedPhoneNumbers

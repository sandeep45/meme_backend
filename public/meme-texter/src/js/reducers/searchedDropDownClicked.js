import K from "../constants/"

const initialSate = false

const searchedDropDownClicked = (state=initialSate, action) => {

  switch(action.type){
    case K.UPDATE_SEARCHED_DROP_DOWN_CLICK:
      return action.value;

    default:
      return state
  };

}

export default searchedDropDownClicked

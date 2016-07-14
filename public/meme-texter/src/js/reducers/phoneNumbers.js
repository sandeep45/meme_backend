import K from "../constants/"

const initialSate = {
  currentPage: 1,
  startNumber: 1,
  endNumber: 10
}

const phoneNumbers = (state=initialSate, action) => {
  switch(action.type){
    case K.UPDATE_PAGE_NUMBER:
      return Object.assign({}, state, { currentPage: action.pageNumber})
    case K.UPDATE_START_NUMBER:
      return Object.assign({}, state, { startNumber: action.startNumber})
      case K.UPDATE_END_NUMBER:
      return Object.assign({}, state, { endNumber: action.endNumber})
    default:
      return state;
  }
};

export default phoneNumbers;
import merge from 'lodash/merge'

const initialSate = {
  phoneNumbers: {},
};

const pagination = (state=initialSate, action) => {
  if(action.response && action.response.paginationData) {
    return merge( {} , state, action.response.paginationData);
  }else{
    return state
  }
}

export default pagination

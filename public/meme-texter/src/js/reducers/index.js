import { combineReducers } from 'redux'

import entities from './entities.js'
import message from './message.js'
import phoneNumbers from './phoneNumbers.js'
import pagination from './pagination.js'
import searchedPhoneNumbers from './searchedPhoneNumbers.js'
import searchedPhonePhrase from './searchedPhonePhrase.js'
import searchedDropDownClicked from './searchedDropDownClicked'

const rootReducer = combineReducers({
  entities,
  message,
  phoneNumbers,
  pagination,
  searchedPhoneNumbers,
  searchedPhonePhrase,
  searchedDropDownClicked
});

export default rootReducer;

export const getSearchedPhonePhrase = (state) => {
  return state.searchedPhonePhrase;
}

export const getPhoneNumbersByIds = (state, ids) => ids.map(id => state.entities.phoneNumbers[id])

export const getPhoneNumbersFilteredByPhrase = (state) => {
  const phrase = getSearchedPhonePhrase(state);

  if(phrase == "") {
    return []
  }

  const filteredIds = state.searchedPhoneNumbers[phrase] || [];
  const phoneNumbers = getPhoneNumbersByIds(state, filteredIds);
  let top5Numbers = phoneNumbers.sort( (a,b) => b.messages.length - a.messages.length).slice(0,5)
  return top5Numbers;
}

export const getSelectedPhoneNumber = (state) => {
  return state.message.to;
}

export const getPhoneNumberDropDownClicked = (state) => {
  return state.searchedDropDownClicked;
}

export const shallWeShowNotification = (state) => {
  return state.message.showNotification;
}

export const shallWeShowErrorNotification = (state) => {
  return state.message.showErrorNotification;
}

export const errorMessage = (state) => {
  return state.message.errorMessage;
}
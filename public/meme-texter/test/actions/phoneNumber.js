/*
store: { getState: [Function: getState],
  getActions: [Function: getActions],
  dispatch: [Function],
  clearActions: [Function: clearActions],
  subscribe: [Function: subscribe] }
*/

import expect from 'expect'
import nock from 'nock'

import * as phoneNumberActions from '../../src/js/actions/phoneNumber'
import K from '../../src/js/constants'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialStoreData = { };

var store;

beforeEach(() => {
  store = mockStore(initialStoreData);
});


describe("searchPhoneNumbers", () => {

  it("exists", () => {
    expect(phoneNumberActions.searchPhoneNumbers).toExist()
  });

  it("reutrns promise", () => {
    const result = store.dispatch(
      phoneNumberActions.searchPhoneNumbers("abc")
    );
    console.log("result is: " + result);
    expect(result.then).toExist()
  });

  it("dispatches a request action immediately", () => {
    const result = store.dispatch(
      phoneNumberActions.searchPhoneNumbers("abc")
    );
    expect(store.getActions()[0].type).toEqual(K.SEARCH_PHONE_NUMBERS_REQUEST);
  });

  it("dispatches a success action after web call is successfuly", () => {

    nock(/http:\/\/localhost/)
      .get('/phone_numbers/search.json')
      .query({"phrase":"abc"})
      .reply(200, [
        {
          id: 1,
          name: "abc123",
          number: "123"
        },
        {
          id: 2,
          name: "abc456",
          number: "456"
        }
      ]);

    const result = store.dispatch(
      phoneNumberActions.searchPhoneNumbers("abc")
    );
    return result.
      then(
        () => {
          expect(store.getActions()[1].type).toEqual(K.SEARCH_PHONE_NUMBERS_SUCCESS)
        }
      )
  });

  it("dispatches a failure action after web call fails", () => {

    nock(/http:\/\/localhost/)
      .get('/phone_numbers/search.json')
      .query({"phrase":"abc"})
      .reply(500);

    const result = store.dispatch(
      phoneNumberActions.searchPhoneNumbers("abc")
    );
    return result.
      then(
        () => {
          expect(store.getActions()[1].type).toEqual(K.SEARCH_PHONE_NUMBERS_FAILURE)
        }
      )
  });

});
import expect from 'expect'

import K from '../../src/js/constants'
import searchedPhoneNumbers from '../../src/js/reducers/searchedPhoneNumbers.js'

describe("searchedPhoneNumbers.js", () => {

  it("returns empty object with when unknown action is given", () => {
    const newState = searchedPhoneNumbers(undefined, {});
    expect(newState).toBeA(Object)
  });

  it("stores phone number ids under the phrase as key", () => {
    const newState = searchedPhoneNumbers(undefined, {
      type: K.SEARCH_PHONE_NUMBERS_SUCCESS,
      response: {
        phrase: "abc",
        result: [1,2,3]
      }
    });

    expect(newState).toEqual({
      "abc": [1,2,3]
    });
  });


  it("replaces old phone number ids under the phrase", () => {
    const newState = searchedPhoneNumbers(
    {
      "abc": [1,2,3]
    },
    {
      type: K.SEARCH_PHONE_NUMBERS_SUCCESS,
      response: {
        phrase: "abc",
        result: [4,5,6]
      }
    });

    expect(newState).toEqual({
      "abc": [4,5,6]
    });
  });

  it("preseves other phrase data and only replaces numbers of phrase passed in", () => {
    const newState = searchedPhoneNumbers(
    {
      "xyz": [1,2,3],
      "abc": [4,5,6],
      "mno": [7,8,9]
    },
    {
      type: K.SEARCH_PHONE_NUMBERS_SUCCESS,
      response: {
        phrase: "abc",
        result: [0,0,0]
      }
    });

    expect(newState).toEqual({
      "xyz": [1,2,3],
      "abc": [0,0,0],
      "mno": [7,8,9]
    });
  });

});

import expect from 'expect'

import K from '../../src/js/constants'
import searchedPhonePhrase from '../../src/js/reducers/searchedPhonePhrase.js'

describe("searchedPhonePhrase.js", () => {

  it("returns empty string with when unknown action is given", () => {
    const newState = searchedPhonePhrase(undefined, {});
    expect(newState).toEqual("")
  });

  it("returns new phrase when updated", () => {
    const newState = searchedPhonePhrase(undefined, {
      type: K.UPDATE_SEARCHED_PHONE_PHRASE,
      phrase: "abc"
    });

    expect(newState).toEqual("abc");
  });

});

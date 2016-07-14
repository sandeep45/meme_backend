import expect from 'expect'
import nock from 'nock'

import * as WebUtil from '../../src/js/config/WebUtil'

describe("searchPhoneNumbers", () => {

  it("exists", () => {
    expect(WebUtil.searchPhoneNumbers).toExist()
  });

  it("reutrns promise", () => {
    const result = WebUtil.searchPhoneNumbers("abc");
    expect(result.then).toExist()
  });

  it("promise upon resolving returns obj with phrase, result & entities", () => {

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

      return WebUtil.searchPhoneNumbers("abc").
      then(
        (normalizedData) => {
          expect(normalizedData.phrase).toEqual("abc");
          expect(normalizedData.result).toEqual([1,2]);
          expect(normalizedData.entities).toExist();
        }
      )

  });

});
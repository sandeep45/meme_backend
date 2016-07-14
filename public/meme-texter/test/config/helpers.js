import expect from 'expect'

import * as helpers from '../../src/js/config/helpers'

describe("getRecordByAttributeAndValue", () => {

  it("exists", () => {
    expect(helpers.getRecordByAttributeAndValue).toExist()
  });

  it("reutrns item which has an attribute which matches value", () => {
    const students = [
      {id: 1, f: "sandeep", l: "arneja"},
      {id: 2, f: "rodrigo", l: "fuentes"},
      {id: 3, f: "saurav", l: "dhar"},
    ];

    const record = helpers.getRecordByAttributeAndValue(students, "l", "fuentes");
    expect(record.id).toEqual(2);
  });

});
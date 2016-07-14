import expect from 'expect'

import entities from '../../src/js/reducers/entities.js'

describe("entities.js", () => {

  it("returns empty object with messages & phoneNumbers properties when unknown action is given", () => {
    const newState = entities(undefined, {});
    expect(newState).toBeA(Object)
    expect(newState.messages).toBeA(Object)
    expect(newState.phoneNumbers).toBeA(Object)
  });

  it("stores phone numbers and messages data from response.entities when state was initially empty", () => {
    const newState = entities(undefined, {
      response: {
        entities: {
          phoneNumbers: {1: "6318137738", 2: "1231231234" },
          messages: {1: "hi", 2: "bye"}
        }
      }
    });

    expect(newState.messages).toEqual({1: "hi", 2: "bye"});
    expect(newState.phoneNumbers).toEqual({1: "6318137738", 2: "1231231234" });
  });

  it("appends phone numbers and messages data from response.entities", () => {
    const initialState = {
      phoneNumbers: {1: "6318137738", 2: "1231231234" },
      messages: {1: "hi", 2: "bye"}
    };
    const newState = entities(initialState, {
      response: {
        entities: {
          phoneNumbers: {3: "0000000000"},
          messages: {3: "whatsup"}
        }
      }
    });

    expect(newState.phoneNumbers).toEqual({1: "6318137738", 2: "1231231234", 3:"0000000000" })
    expect(newState.messages).toEqual({1: "hi", 2: "bye", 3: "whatsup"})
  });

  it("updates phone numbers and messages data from response.entities", () => {
    const initialState = {
      phoneNumbers: {1: "6318137738", 2: "1231231234" },
      messages: {1: "hi", 2: "bye"}
    };
    const newState = entities(initialState, {
      response: {
        entities: {
          phoneNumbers: {1: "1"},
          messages: {1: "ola"}
        }
      }
    });

    expect(newState.phoneNumbers).toEqual({1: "1", 2: "1231231234"});
    expect(newState.messages).toEqual({1: "ola", 2: "bye"});
  });

});

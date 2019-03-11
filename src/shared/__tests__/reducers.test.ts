import { reducers } from '../reducers';

describe("add data reducer", () => {
  it("should return the initial state", () => {
    expect(reducers(undefined, {type: "", payload: null})).toEqual({})
  })
  it ("should handle ADD_DATA", () => {
    const addDataAction = {
      type: "ADD_DATA",
      payload: {
        user: 123
      }
    }
    expect(reducers({}, addDataAction)).toEqual(addDataAction.payload);
  })
})

import * as actions from '../actions';

describe("actions", () => {
  it("should create an action to add data", () => {
    const payload = {};
    const expectedAction = {
      type: "ADD_DATA",
      payload,
    }
    expect(actions.addData(payload)).toEqual(expectedAction);
  })
})
import {Action} from './constants';

const intitalState = {};

export const reducers = (state = intitalState, action: Action) => {
  switch (action.type) {
    case 'ADD_DATA':
      return {...state, ...action.payload}
    default:
      return state
  }
}
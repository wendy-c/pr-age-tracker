import {Action} from './constants';

export const reducers = (state = {}, action: Action) => {
  switch (action.type) {
    case 'ADD_DATA':
      return {...state, ...action.payload}
    default:
      return state
  }
}
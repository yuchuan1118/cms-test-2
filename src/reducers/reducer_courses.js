import { FETCH_COURSES, FETCH_POST, DELETE_POST } from '../actions/index';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_COURSES:
      // return _.mapKeys(action.payload.data, 'id');
      return action.payload;
    // case FETCH_POST:
    //   // const post = action.payload.data;
    //   // const newState = { ...state };
    //   // newState[post.id] = post;
    //   // return newState;
    //   return { ...state, [action.payload.id]: action.payload };
    // case DELETE_POST:
    //   return _.omit(state, action.payload);
    default:
      return state;
  }
}

import { FETCH_USERS } from '../actions/index';

import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    default:
      return state;
  }
}

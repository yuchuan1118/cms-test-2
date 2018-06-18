import { FETCH_SERVER_RECEIPTS } from '../actions/index';

import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_SERVER_RECEIPTS:
      return action.payload;
    default:
      return state;
  }
}

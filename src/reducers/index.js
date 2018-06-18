import { combineReducers } from 'redux';
import CoursesReducer from './reducer_courses';
import ReceiptsReducer from './reducer_receipts';
import ServerReceiptsReducer from './reducer_server_receipts';
import UsersReducer from './reducer_users';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  courses: CoursesReducer,
  receipts: ReceiptsReducer,
  server_receipts: ServerReceiptsReducer,
  users: UsersReducer,
  form: formReducer
});

export default rootReducer;

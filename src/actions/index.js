export const FETCH_COURSES = 'fetch_courses';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';

export const FETCH_RECEIPTS = 'fetch_receips';
export const FETCH_USERS = 'fetch_users';

// firebase API
// import Firebase from 'firebase';

// It looks like you're using the development build of the Firebase JS SDK.
// When deploying Firebase apps to production, it is advisable to only import
// the individual SDK components you intend to use.
import Firebase from 'firebase/app';
import 'firebase/database'; // import 'firebase/<PACKAGE>';

import FIREBASE_CONFIG from '../config/firebase';
// Firebase.initializeApp(FIREBASE_CONFIG.DEV);
Firebase.initializeApp(FIREBASE_CONFIG.PRODUCTION);

const database = Firebase.database();
// const AllCoursesRef = database.ref('posts/');
const AllCoursesRef = database.ref('AllCourses/');
const CashFlowRef = database.ref('CashFlow/');
const UsersRef = database.ref('Users/');

export function fetchCourses() {
  // const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  // return {
  //   type: FETCH_POSTS,
  //   payload: request
  // };
  return dispatch => {
    AllCoursesRef.on('value', snapshot => {
      console.log('fetchCourses');
      // console.log('fetchCourses:', snapshot.val());
      dispatch({
        type: FETCH_COURSES,
        payload: snapshot.val()
      });
    });
  };
}

export function createPost(values, callback) {
  // const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values).then(() => {
  //   callback();
  // });
  // return {
  //   type: CREATE_POST,
  //   payload: request
  // };
  const newCourseId = AllCoursesRef.push().key;
  return dispatch => {
    AllCoursesRef.child(newCourseId)
      .update({ ...values, courseId: newCourseId })
      .then(
        () => {
          callback();
        },
        e => {
          console.log(e);
          callback();
        }
      );
  };
}

export function fetchPost(id) {
  // const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
  //
  // return {
  //   type: FETCH_POST,
  //   payload: request
  // };
  return dispatch => {
    AllCoursesRef.child(id).once('value', snapshot => {
      console.log('fetchPost');
      // console.log('fetchPost:', snapshot.val());
      dispatch({
        type: FETCH_POST,
        payload: snapshot.val()
      });
    });
  };
}

export function deletePost(id, callback) {
  // const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then(() => {
  //   callback();
  // });
  //
  // return {
  //   type: DELETE_POST,
  //   payload: id
  // };
  return dispatch => {
    AllCoursesRef.child(id)
      .remove()
      .then(() => {
        callback();
      });
  };
  // return dispatch => {
  //   AllCoursesRef.child(id)
  //     .set(null)
  //     .then(() => {
  //       callback();
  //     });
  // };
}

export function updatePost(id, values, callback) {
  // console.log('updatePost: ', id, values);
  return dispatch => {
    database
      .ref(`posts/${id}`) /////////////// to be fixed
      .update(values)
      .then(() => {
        callback();
      });
  };
}

export function fetchReceipts() {
  return dispatch => {
    CashFlowRef.on('value', snapshot => {
      console.log('fetchReceipts');
      dispatch({
        type: FETCH_RECEIPTS,
        payload: snapshot.val()
      });
    });
  };
}

export function fetchUsers() {
  return dispatch => {
    UsersRef.on('value', snapshot => {
      console.log('fetchUsers');
      dispatch({
        type: FETCH_USERS,
        payload: snapshot.val()
      });
    });
  };
}

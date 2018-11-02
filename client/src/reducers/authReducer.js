import { FETCH_USER } from '../actions/types';

export default (state = null, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_USER: 
      return action.payload || false;
    default:
      return state; 
  }
}

// There are three situations that we are 
// handling here. (1) is when the authentication
// has neither failed nor succeeded. We are still
// waiting on it. In that case, you do not want to
// get the user logged in or later change the header
// when the user is authenticated. We return null
// by initializing the state of the store to null instead
// of an empty object.

// (2) When the user is successfully logged in, in which
// case we get the User Model(internal id, Google id) back 

// (3) When the user fails the authentication, in which case
// we get an empty string. If we get an empty string we return
// false; which is what is handled by action.payload || false
// return false if empty string (which is a falsy value).
import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Using thunk, the action creater returns a function
// that when executed returns an action.
// so what Thunk does is gives us direct access to the dispatch
// function that can then be called manually, whenever needed
// you return a function that is then called by dispatch function
// to return an action
// Here we want to dispatch an action only after api request has
// completed. We want to wait for only after the promise has
// resolved.
// Redux Thunk sees that we have returned a function, it then
// makes the api call, waits for the promise to resolve and then
// calls the dispatch function to send the action;

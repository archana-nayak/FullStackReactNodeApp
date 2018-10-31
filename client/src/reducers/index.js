import { combinedReducer } from 'redux';
import authReducer from './authReducer';

export default combinedReducer({ 
  auth: authReducer
});
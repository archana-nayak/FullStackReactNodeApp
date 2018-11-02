import materializeCss from 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';

import App from './components/App';
import reducer from './reducers';
import reduxThunk from 'redux-thunk';

//dummy reducer that returns an array ;() => []
//initial state of the store 
//invoke the applyMiddleware, right now there is no 
// middleware but will be replaced by redux thunk
const store = createStore(reducer, {}, applyMiddleware(reduxThunk));


ReactDom.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
 );
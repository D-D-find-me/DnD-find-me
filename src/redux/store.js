import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import promiseMiddleware from 'redux-promise-middleware';
import {composeWithDevTools} from 'redux-devtools-extension';

export default createStore(reducer, composeWithDevTools(applyMiddleware(promiseMiddleware)));
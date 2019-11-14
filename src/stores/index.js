import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import incrementReducer from '../reducers';

const store = createStore(incrementReducer, applyMiddleware(thunk));

export default store;
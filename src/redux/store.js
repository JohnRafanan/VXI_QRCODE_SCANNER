// src/redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
import qrReducer from './qrSlice';
import scannerReducer from '../reducer/reducer'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({ 
  data: scannerReducer,
 })

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;
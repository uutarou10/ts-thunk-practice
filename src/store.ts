import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from "../node_modules/redux";
import articles from './module/articles';

export default createStore(
  combineReducers({
    articles
  }),
  applyMiddleware(thunk)
)
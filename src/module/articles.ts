import axios from 'axios';
import { Action, ActionCreator } from "../../node_modules/redux";
import { ThunkAction, ThunkDispatch } from "../../node_modules/redux-thunk";
import { Article } from "../model/article";

export enum ActionTypes {
  ADD = 'article/add',
  START_FETCH = 'article/start_fetch',
  ENDED_FETCH = 'article/ended_fetch',
}

interface AddArticleAction extends Action {
  type: ActionTypes.ADD,
  article: Article
}

export const addArticle: ActionCreator<AddArticleAction> = (article: Article) => ({
  type: ActionTypes.ADD,
  article
});

export const startFetch: ActionCreator<Action<ActionTypes.START_FETCH>> = () => ({
  type: ActionTypes.START_FETCH
});

export const endedFetch: ActionCreator<Action<ActionTypes.ENDED_FETCH>> = () => ({
  type: ActionTypes.ENDED_FETCH
});

export const fetchArticles: ActionCreator<ThunkAction<void, State, void, Actions>> = () => {
  return (dispatch: ThunkDispatch<State, void, Actions>) => {
    dispatch(startFetch());
    axios.get('https://qiita.com/api/v2/users/uutarou10/items')
      .then((res) => {
        console.log(res);
        dispatch(endedFetch());
      });
  }
}

// reducer

interface State {
  articles: Article[]
  isFetching: boolean
}

type Actions =
  AddArticleAction |
  Action<ActionTypes.START_FETCH> |
  Action<ActionTypes.ENDED_FETCH>;

const defaultState: State = {
  articles: [],
  isFetching: false 
}

export default (state: State = defaultState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.ADD:
      return {
        ...state,
        articles: [...state.articles, action.article]
      };
    case ActionTypes.START_FETCH:
      return {
        ...state,
        isFetching: true
      };
    case ActionTypes.ENDED_FETCH:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}
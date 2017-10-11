import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function breadcrumbsReducer(state = initialState.breadcrumbs, action) {
  switch (action.type) {
    case types.LOAD_BREADCRUMBS:
      return action.breadcrumbs;
    case types.UPDATE_BREADCRUMBS:
      return {...state, categories: action.breadcrumbs};
    default:
      return state;
  }
}
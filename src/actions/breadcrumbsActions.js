import * as types from './actionTypes';

export function loadBreadcrumbs() {
  return function(dispatch) {
    return dispatch(loadBreadcrumbsSuccess());
  };
}

export function updateBreadcrumbs(breadcrumbs) { 
  return function (dispatch) {
    return dispatch(updateBreadcrumbsSuccess(breadcrumbs));
  };
}

export function loadBreadcrumbsSuccess(breadcrumbs) {
  return { type: types.LOAD_BREADCRUMBS, breadcrumbs };
}

export function updateBreadcrumbsSuccess(breadcrumbs) {
  return { type: types.UPDATE_BREADCRUMBS, breadcrumbs };
}
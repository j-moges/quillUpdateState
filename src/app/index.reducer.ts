import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

  import * as fromApp from './app.reducer';

  export interface AppState {
      appReducer: fromApp.State;
  }

  export interface State extends fromApp.State {
    appState: AppState;
  }

  export const reducers: ActionReducerMap<AppState> = {
      appReducer: fromApp.reducer
  }

  export const getAppState = createFeatureSelector<State, AppState>('appState');

  export const getAppReducerState = createSelector(
      getAppState,
      (state: AppState) => state.appReducer
  )

  export const getQuillContentState = createSelector(
      getAppReducerState,
      fromApp.quillContentState
  )
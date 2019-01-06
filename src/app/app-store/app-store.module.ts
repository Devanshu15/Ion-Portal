import { StoreModule, ActionReducerMap, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'
import { NgModule } from '@angular/core';
import { UserEffectsService } from './user-effects.service';
import { UserStatus, AppState, UserState } from './interfaces';
import { LoggingIn, UpdateUserInfo, LoggingOut, ServerError } from './actions';

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  errorMessage: errorReducer,
}

@NgModule({
  imports: [
    StoreModule.forFeature('app', reducers),
    EffectsModule.forFeature([UserEffectsService]),
  ],
})
export class AppStoreModule {}

export function userReducer(
    state: UserState = {firstName: '', lastName: '', status: UserStatus.LOGGED_OUT},
    action: Action) {
  if (action instanceof LoggingIn) {
    return {...state, status: UserStatus.LOGGING_IN};
  }

  if (action instanceof LoggingOut) {
    return {...state, status: UserStatus.LOGGING_OUT};
  }

  if (action instanceof UpdateUserInfo) {
    return  {...action.payload};
  }
  return state;
}


export const selectAppState = createFeatureSelector<AppState>('app');
export const selectUserInfo = createSelector(selectAppState, state => state.user);
export const selectUserStatus = createSelector(selectUserInfo, (state) => state.status);

export function errorReducer(state: {message: ''}, action: Action) {
  if (action instanceof ServerError) {
    return action.payload;
  }
return state;
}

export const selectErrorMessage = createSelector(selectAppState, state => state.errorMessage);

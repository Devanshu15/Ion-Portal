import {LoginResponse, LoginState, UserState} from './interfaces';
import {Action} from '@ngrx/store'

export enum UserActions {
  LOGIN = 'login',
  LOGOUT = 'logout',
  UPDATE = 'update',
  LOGGINGIN = 'logging in',
  LOGGINGOUT = 'logging out',  
}

export enum AppAction {
  error = 'error',
}

export class Login implements Action {
  readonly type = UserActions.LOGIN;
  constructor(public payload: LoginState) {}
}

export class Logout implements Action {
    readonly type = UserActions.LOGOUT;
}

export class UpdateUserInfo implements Action {
  readonly type  = UserActions.UPDATE;
  constructor(public payload: UserState) {}
}

export class LoggingIn implements Action {
  readonly type = UserActions.LOGGINGIN;
}

export class LoggingOut implements Action {
  readonly type = UserActions.LOGGINGOUT;
}

export class ServerError implements Action{
  readonly type = AppAction.error;
  constructor(public payload: {message: string}) {}
}
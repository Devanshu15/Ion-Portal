
export interface AppState {
    user: UserState;
    errorMessage: {message: string};
  }
  
export interface UserState {
  firstName: string;
  lastName: string;
  status: UserStatus;
  }

export interface LoginState {
  username: string;
  password: string;
}

export interface LogoutResponse {
  success: boolean;
  errorMessage: string|null;
}
  
  export interface LoginResponse {
    userInfo: {firstName: string; lastName: string};
    success: boolean;
    errorMessage: string|null
  }
  
export enum UserStatus {
  LOGGED_IN = 'Logged in',
  LOGGED_OUT = 'Not logged in',
  LOGGING_IN = 'Logging in (operation in progress)',
  LOGGING_OUT = 'Logging out (operation in progress)',
}
  
export enum UserActions {
  LOGIN = 'login',
  LOGOUT = 'logout',
  UPDATE = 'update',
  LOGGINGIN = 'logging in',
}
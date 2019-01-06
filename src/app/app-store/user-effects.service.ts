import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {flatMap, map, switchMap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserActions, Login, UpdateUserInfo, Logout, ServerError } from './actions';
import { UserStatus, LoginResponse, LogoutResponse } from './interfaces';
import { NgPlural } from '@angular/common';

export declare interface UserEffects {
  login: Observable<Action>;
  logout: Observable<Action>;
}

/** Service for sending login and logout request to server. */
@Injectable()
export class UserEffectsService implements UserEffects {
  @Effect()
  login:  Observable<Action> = this.actions.pipe(
    ofType<Login>(UserActions.LOGIN),
    flatMap((action) => this.http.post<LoginResponse>('login', action.payload)
                                      .pipe(switchMap((res: LoginResponse) => {
                                        if (res.success) {
                                          const userInfo = {
                                            firstName: res.userInfo.firstName,
                                            lastName: res.userInfo.lastName,
                                            status: UserStatus.LOGGED_IN,
                                          };
                                          return [new UpdateUserInfo(userInfo)];
                                        } else {
                                          const userInfo = {
                                            firstName: '',
                                            lastName: '',
                                            status: UserStatus.LOGGED_OUT,
                                          };
                                          return [new UpdateUserInfo(userInfo),
                                            new ServerError({message: res.errorMessage})];
                                        }
                                      })))
                                        );

  @Effect()
  logout: Observable<Action> = this.actions.pipe(
    ofType<Logout>(UserActions.LOGOUT),
    flatMap((action) => this.http.get<LogoutResponse>('logout')
                                      .pipe(map ((res: LogoutResponse) => {
                                        if (res.success) {
                                          const userInfo = {
                                            firstName: '',
                                            lastName: '',
                                            status: UserStatus.LOGGED_OUT,
                                          };
                                          console.log('success logging out');
                                          return new UpdateUserInfo(userInfo);
                                        } else {
                                          return new ServerError({message: res.errorMessage});
                                        }
                                      })))
  );

  constructor(private readonly actions: Actions,
              private readonly store: Store<{}>,
              private readonly http: HttpClient) {}
}

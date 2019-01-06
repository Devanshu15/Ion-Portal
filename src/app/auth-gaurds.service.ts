import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { UserStatus, AppState } from './app-store/interfaces';
import { selectUserStatus } from './app-store/app-store.module';

@Injectable({
  providedIn: 'root'
})
export class LoginGaurdService {

  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(): boolean {
    let status = false;
    this.store.pipe(select(selectUserStatus)).subscribe(userStatus => {
      status = (userStatus === UserStatus.LOGGED_IN);
    });
    if (!status) {
      this.router.navigate(['login'])
    }
    return status;
  }
}

@Injectable({
  providedIn: 'root'
})
export class LogoutGaurdService {

  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(): boolean {
    let status = false;
    this.store.pipe(select(selectUserStatus)).subscribe(userStatus => {
      status = (userStatus === UserStatus.LOGGED_OUT);
    });
    return status;
  }
}

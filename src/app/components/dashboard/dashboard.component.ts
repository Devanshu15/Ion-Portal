import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectUserStatus, selectUserInfo } from '../../app-store/app-store.module';
import { Router } from '@angular/router';
import { LoggingOut, Logout } from '../../app-store/actions';
import { UserStatus, UserState, AppState } from '../../app-store/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: Observable<UserState>
  constructor(private readonly store: Store<AppState>, private readonly router: Router) {
    this.user = this.store.pipe(select(selectUserInfo));
    this.store.pipe(select(selectUserStatus)).subscribe(
      (status: UserStatus) => {
        if(status === UserStatus.LOGGED_OUT){
          this.router.navigate(['/login']);
        }
      }
    );
  }

  logout() {
    this.store.dispatch(new LoggingOut());
    this.store.dispatch(new Logout());
  }
}

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { selectUserStatus, selectErrorMessage } from './app-store/app-store.module';
import { UserStatus, UserState } from './app-store/interfaces';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  status: UserStatus;
  showLoader = false;

  constructor(private store: Store<UserState>, private snackBar: MatSnackBar) {
    this.store.pipe(select(selectUserStatus)).subscribe(
      (status: UserStatus) => {
        this.status = status;
        this.showLoader = false;
        if (status === UserStatus.LOGGING_IN || status === UserStatus.LOGGING_OUT) {
          this.showLoader = true;
        }
      }
    );
    this.store.pipe(select(selectErrorMessage)).subscribe(
      (error) => {
        if (error && error.message) {
          this.snackBar.open(error.message, 'Pl try again', {duration: 2000,});
        }
      }
    );
  }
}

import { Component } from '@angular/core';
import { FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store, select } from '@ngrx/store';
import { selectUserStatus } from '../../app-store/app-store.module';
import { LoggingIn, Login } from '../../app-store/actions';
import { Router } from '@angular/router';
import { UserStatus, AppState } from '../../app-store/interfaces';

/** Displays Login form. */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  dirtyStateMatcher = new DirtyStateMatcher();
  username = new FormControl('', [Validators.required, specialCharValidator()]);
  password = new FormControl('', [Validators.required, specialCharValidator()]);

  constructor(private readonly store: Store<AppState>, private readonly router: Router) {
    this.store.pipe(select(selectUserStatus)).subscribe(
      (status: UserStatus) => {
        if(status === UserStatus.LOGGED_IN){
          this.router.navigate(['/dashboard']);
        }
      }
    );
  }

  login() {
    this.store.dispatch(new LoggingIn());
    this.store.dispatch(
        new Login({username: this.username.value, password: this.password.value})
    );
  }
}

export function specialCharValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    const regEx = /[ ^,.\\[\]\/?]/;
    const error = regEx.test(control.value);
    return error ? {'specialChars': true} : null;
  };
}

export class DirtyStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid && control.dirty);
  }
}
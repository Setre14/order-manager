import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../style.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  formIsValid() {
    return this.loginForm.valid;
  }

  login() {
    if (!this.formIsValid()) {
      return;
    }

    const userValue = this.loginForm.value;

    this.userService.login(userValue).then(res => {
      if (res) {
        this.router.navigateByUrl('');
      }
    });
  }
}

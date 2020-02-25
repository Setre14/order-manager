import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../style.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {}

  login(form){
    this.userService.login(form.value).then((res)=>{
      console.log(res)
      if (res) {
        this.router.navigateByUrl('');
      }
    });
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login' },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}

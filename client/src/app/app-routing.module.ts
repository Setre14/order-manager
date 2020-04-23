import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tables',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'tables',
        loadChildren: () =>
          import('./components/tables/tables.module').then(m => m.TablesModule),
        canActivate: [LoginGuard],
      },
      {
        path: 'floorplan',
        loadChildren: () =>
          import('./components/floorplan/floorplan.module').then(
            m => m.FloorplanModule
          ),
        canActivate: [],
      },
      {
        path: 'manage',
        loadChildren: () =>
          import('./components/manage/manage.module').then(m => m.ManageModule),
        canActivate: [LoginGuard, AdminGuard],
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./components/settings/settings.module').then(
            m => m.SettingsModule
          ),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./components/auth/auth.module').then(m => m.AuthModule),
      },
    ],
  },
];

@NgModule({
  declarations: [MenuComponent],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

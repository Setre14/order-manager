import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';

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
        canActivate: [AuthGuard]
      },
      {
        path: 'floorplan',
        loadChildren: () =>
          import('./components/floorplan/floorplan.module').then(
            m => m.FloorplanModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: 'manage',
        loadChildren: () =>
          import('./components/manage/manage.module').then(m => m.ManageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./components/settings/settings.module').then(m => m.SettingsModule),
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

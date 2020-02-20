import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { HeaderMenuComponent } from './header-menu/header-menu.component';

@NgModule({
  declarations: [HeaderMenuComponent],
  imports: [CommonModule, FormsModule, IonicModule, ZXingScannerModule],
  exports: [HeaderMenuComponent],
  entryComponents: [],
})
export class SharedModule {}

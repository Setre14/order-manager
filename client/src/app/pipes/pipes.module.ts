import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeAt from '@angular/common/locales/de-AT';

import { CurrencyPipe } from './currency.pipe';

registerLocaleData(localeAt, 'de-at');

@NgModule({
  declarations: [CurrencyPipe],
  imports: [CommonModule],
  exports: [CurrencyPipe],
})
export class PipesModule {}

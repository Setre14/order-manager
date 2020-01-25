import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { QrReaderComponent } from '../qr-reader/qr-reader.component';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    public utilService: UtilService
    ) { }

  search(): void {
    this.utilService.openDialog(SearchComponent);
  }

  readQr(): void {
    this.utilService.openDialog(QrReaderComponent);
  }
}

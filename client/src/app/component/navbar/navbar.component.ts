import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SearchComponent } from '../search/search.component';
import { QrReaderComponent } from '../qr-reader/qr-reader.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  refWidth = '95%';

  constructor(
    public matDialog: MatDialog
    ) { }

  search(): void {
    this.matDialog.open(SearchComponent, {
      width: this.refWidth
    });
  }

  readQr(): void {
    this.matDialog.open(QrReaderComponent, {
      width: this.refWidth
    });
  }
}

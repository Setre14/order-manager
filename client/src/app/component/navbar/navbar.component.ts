import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    public searchDialog: MatDialog
    ) { }

  search(): void {
    const dialogRef = this.searchDialog.open(SearchComponent, {
      width: '250px'
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

}

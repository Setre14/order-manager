import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderService } from 'src/app/service/order.service';
import { FavTableService } from 'src/app/service/fav-table.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [
    './search.component.scss',
    '../../style/style.scss'
  ]
})
export class SearchComponent {
  table: string;

  constructor(
    public dialogRef: MatDialogRef<SearchComponent>,
    public router: Router,
    public favTableService: FavTableService
  ) { }

  getFavTables(): string[] {
    return this.favTableService.getFavTable();
  }

  closeOverlay(): void {
    this.dialogRef.close();
  }

  switchToTable(): void {
    this.closeOverlay();
    this.router.navigate(['/table', this.table]);
  }
}

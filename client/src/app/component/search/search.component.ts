import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
    public router: Router
  ) { }

  closeOverlay(): void {
    this.dialogRef.close();
  }

  switchToTable(): void {
    this.closeOverlay();
    this.router.navigate(['/table', this.table]);
  }
}

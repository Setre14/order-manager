import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { FavTableService } from 'src/app/service/fav-table.service';
import { FormControl} from '@angular/forms';
import { TableOverviewService } from 'src/app/service/table-overview.service';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  tableControl = new FormControl();

  filteredTables: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<SearchComponent>,
    public router: Router,
    public favTableService: FavTableService,
    public tableOverviewService: TableOverviewService
  ) { }

  ngOnInit() {
    this.tableOverviewService.loadTables();
    this.favTableService.loadFavTable();

    this.filteredTables = this.tableControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tableOverviewService.getTableNames().filter(table => table.toLowerCase().includes(filterValue));
  }

  getFavTables(): string[] {
    return this.favTableService.getFavTable();
  }

  getTables(): string[] {
    return this.tableOverviewService.getTableNames();
  }

  closeOverlay(): void {
    this.dialogRef.close();
  }

  onSubmit(table: any): void {
    this.closeOverlay();
    this.router.navigate(['/table', table]);
  }
}

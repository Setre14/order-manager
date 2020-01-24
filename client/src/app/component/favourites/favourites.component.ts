import { Component, OnInit } from '@angular/core';
import {TableOverviewService} from '../../service/table-overview.service';
import { MatDialogRef } from '@angular/material';
import { FavTableService } from 'src/app/service/fav-table.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  favTables: string[] = [];

  constructor(
    public tableOverviewService: TableOverviewService,
    public dialogRef: MatDialogRef<FavouritesComponent>,
    public favTableService: FavTableService
  ) { }

  ngOnInit() {
    this.favTables = this.favTableService.getFavTable();
  }

  getTableNames(): string[] {
    return this.tableOverviewService.getTableNames();
  }

  isFavourite(table: string): boolean {
    return this.favTables.includes(table);
  }

  changeFavTable(table: string) {
    if (this.favTables.includes(table)) {
      this.favTables = this.favTables.filter(t => t !== table);
    } else {
      this.favTables.push(table);
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.favTableService.setFavTables(this.favTables);
    this.close();
  }
}

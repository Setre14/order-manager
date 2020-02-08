import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { TableService } from 'src/app/services/table.service';
import { ModalController } from '@ionic/angular';
import { ManageAddTableComponent } from '../add/add-table/add-table.component';

@Component({
  selector: 'app-manage-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class ManageTableComponent implements OnInit {
  expandedLoc: string;

  constructor(
    private modalCtrl: ModalController,
    private locService: LocationService,
    private tableService: TableService
  ) { }

  ngOnInit() {
    this.locService.loadLocations();
    this.tableService.loadTables();
  }

  getLocations(): string[] {
    return this.locService.getLocations();
  }

  expand(loc: string): void {
    this.expandedLoc = this.expandedLoc == loc ? '' : loc;
  }

  isExpanded(loc: string): boolean {
    return this.expandedLoc == loc;
  }

  getTableNames(loc: string): string[] {
    return this.tableService.getLocationTableNames(loc);
  }

  async add(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ManageAddTableComponent
    });
    await modal.present();
  }
}

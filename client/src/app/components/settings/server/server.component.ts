import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'settings-server',
  templateUrl: './server.component.html',
  styleUrls: ['../../../style.scss'],
})
export class ServerComponent implements OnInit {
  serverUrl: string = '';

  constructor(
    private comServivce: CommunicationService,
    private utilService: UtilService
  ) {}

  async ngOnInit() {
    this.serverUrl = await this.comServivce.getUrl();
  }

  setServer() {
    this.comServivce.setUrl(this.serverUrl);
    this.utilService.showToast(`Server: ${this.serverUrl}`);
  }

  async reset() {
    this.comServivce.resetUrl();
    this.serverUrl = await this.comServivce.getUrl();
    this.utilService.showToast(`Server: ${this.serverUrl}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  serverUrl: string = '';

  constructor(
    private comServivce: CommunicationService,
    private utilService: UtilService
  ) { }

  async ngOnInit() {
    this.serverUrl = await this.comServivce.getUrl();
  }

  setServer() {
    this.comServivce.setUrl(this.serverUrl);
    this.utilService.showToast(`Changed Server to ${this.serverUrl}`)
  }

  async reset() {
    this.comServivce.resetUrl();
    this.serverUrl = await this.comServivce.getUrl();
    this.utilService.showToast(`Reset Server to ${this.serverUrl}`)
    this.utilService.removeKey('serverUrl')
  }
}

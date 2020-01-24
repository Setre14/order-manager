import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommunicationService } from 'src/app/service/communication.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  serverForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public comService: CommunicationService
  ) {
    this.serverForm = this.formBuilder.group({
      url: ''
    });
  }

  ngOnInit() {
  }

  getServerUrl(): string {
    return this.comService.getUrl();
  }

  onSubmitServer(serverData: any) {
    this.comService.setUrl(serverData.url);
  }

}

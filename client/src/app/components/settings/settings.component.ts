import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../../style.scss'],
})
export class SettingsComponent implements OnInit {
  serverUrl: string = '';

  constructor() {}

  ngOnInit() {}
}

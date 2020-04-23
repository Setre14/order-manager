import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['../../../style.scss'],
})
export class HeaderMenuComponent implements OnInit {
  @Input() title: string[];

  constructor() {}

  ngOnInit() {}
}

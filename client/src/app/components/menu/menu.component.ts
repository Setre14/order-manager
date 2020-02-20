import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  pages = [
    {
      title: 'Tables',
      icon: 'home',
      url: '/tables'
    },
    {
      title: 'Floorplan',
      icon: 'apps',
      url: '/floorplan'
    },
    {
      title: 'Manage',
      icon: 'pencil',
      url: '/manage'
    },
  ]

  selectedPath = '';

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {
  }

}

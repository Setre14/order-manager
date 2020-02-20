import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../../style.scss'],
})
export class MenuComponent implements OnInit {
  pages = [
    {
      title: 'Tables',
      icon: 'home',
      url: '/tables',
    },
    // {
    //   title: 'Floorplan',
    //   icon: 'apps',
    //   url: '/floorplan',
    // },
    {
      title: 'Manage',
      icon: 'pencil',
      url: '/manage',
    },
    {
      title: 'Settings',
      icon: 'settings',
      url: '/settings',
    },
  ];

  selectedPath = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {}
}

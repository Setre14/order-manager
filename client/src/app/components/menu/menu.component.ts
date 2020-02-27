import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

class Page {
  title: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../../style.scss'],
})
export class MenuComponent implements OnInit {
  private PAGES = [
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

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  async ngOnInit() { }

  getPages(): Page[] {
    const pages = [].concat(this.PAGES)

    if (this.isLoggedIn()) {
      pages.push(
        {
          title: 'Logout',
          icon: 'log-out',
          url: '/auth/logout'
        }
      )
    } else {
      pages.push(
        {
          title: 'Login',
          icon: 'log-in',
          url: '/auth/login'
        }
      )
    }

    return pages;
  }

  isLoggedIn(): boolean {
    return this.userService.loggedIn;
  }
}

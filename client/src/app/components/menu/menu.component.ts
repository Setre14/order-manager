import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Role } from '../../../../../shared';

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
      title: 'Tische',
      icon: 'home',
      url: '/tables',
    },
    {
      title: 'Tischplan',
      icon: 'map',
      url: '/floorplan',
    },
    {
      title: 'Bearbeiten',
      icon: 'pencil',
      url: '/manage',
    },
    {
      title: 'Einstellungen',
      icon: 'settings',
      url: '/settings',
    },
  ];

  selectedPath = '';

  constructor(private router: Router, private userService: UserService) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  async ngOnInit() {}

  getPages(): Page[] {
    const pages = [].concat(this.PAGES);

    if (this.isLoggedIn()) {
      pages.push({
        title: 'Logout',
        icon: 'log-out',
        url: '/auth/logout',
      });
    } else {
      pages.push({
        title: 'Login',
        icon: 'log-in',
        url: '/auth/login',
      });
    }

    return pages;
  }

  getMenuTitle() {
    const user = this.userService.curUser;
    if (user) {
      return `Hallo ${user.username}!`;
    } else {
      return `Bitte log dich ein.`;
    }
  }

  isLoggedIn(): boolean {
    return this.userService.loggedIn;
  }

  isActivated(page: Page): boolean {
    if (page.title == 'Tables') {
      return this.selectedPath.startsWith(page.url) || this.selectedPath == '';
    } else {
      return this.selectedPath.startsWith(page.url);
    }

    return false;
  }

  isDisabled(page: Page): boolean {
    const user = this.userService.curUser;
    if (page.url == '/manage') {
      if (!user || user.role != Role.ADMIN) {
        return true;
      }
    } else if (page.url == '/tables') {
      if (!user) {
        return true;
      }
    }

    return false;
  }
}

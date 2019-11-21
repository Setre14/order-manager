import { Component } from '@angular/core';
import {SearchOverlayService} from '../search/search-overlay.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public searchOverlay: SearchOverlayService) { }

  search(): void {
    this.searchOverlay.openOverlay();
  }

}

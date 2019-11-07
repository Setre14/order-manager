import { Component, OnInit } from '@angular/core';
import {SearchOverlayService} from '../search/search-overlay.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private searchOverlay: SearchOverlayService) { }

  ngOnInit() {
  }

  search() {
    this.searchOverlay.openOverlay();
  }

}

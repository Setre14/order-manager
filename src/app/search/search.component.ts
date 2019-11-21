import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SearchOverlayService} from './search-overlay.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [
    './search.component.scss',
    '../style/style.scss'
  ]
})
export class SearchComponent implements OnInit {
  @ViewChild('tableInput', {static: true})
  input: ElementRef;

  table: string;

  constructor(public searchOverlay: SearchOverlayService, public router: Router) { }

  ngOnInit() {
    this.input.nativeElement.focus();
  }

  closeOverlay() {
    this.searchOverlay.closeOverlay();
  }

  switchToTable() {
    this.closeOverlay();
    this.router.navigate(['/table', this.table]);
  }
}

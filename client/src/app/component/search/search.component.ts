import {Component} from '@angular/core';
import {SearchOverlayService} from '../../service/search-overlay.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [
    './search.component.scss',
    '../../style/style.scss'
  ]
})
export class SearchComponent {
  table: string;

  constructor(public searchOverlay: SearchOverlayService, public router: Router) { }

  closeOverlay(): void {
    this.searchOverlay.closeOverlay();
  }

  switchToTable(): void {
    this.closeOverlay();
    this.router.navigate(['/table', this.table]);
  }
}

import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {SearchOverlayService} from './search-overlay.service';
import {MatInput} from '@angular/material';

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
  searchPortal: ComponentPortal<SearchComponent>;
  overlayRef: OverlayRef;

  constructor(public searchOverlay: SearchOverlayService) { }

  ngOnInit() {
    this.input.nativeElement.focus();
  }

  closeOverlay() {
    this.searchOverlay.closeOverlay();
  }
}

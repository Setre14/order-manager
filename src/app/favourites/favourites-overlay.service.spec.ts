import { TestBed } from '@angular/core/testing';

import { FavouritesOverlayService } from './favourites-overlay.service';

describe('FavouritesOverviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavouritesOverlayService = TestBed.get(FavouritesOverlayService);
    expect(service).toBeTruthy();
  });
});

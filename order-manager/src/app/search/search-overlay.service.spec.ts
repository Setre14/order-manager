import { TestBed } from '@angular/core/testing';

import { SearchOverlayService } from './search-overlay.service';

describe('SearchOverlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchOverlayService = TestBed.get(SearchOverlayService);
    expect(service).toBeTruthy();
  });
});

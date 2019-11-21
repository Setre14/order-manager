import { TestBed } from '@angular/core/testing';

import { TableOverviewService } from './table-overview.service';

describe('TableOverviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableOverviewService = TestBed.get(TableOverviewService);
    expect(service).toBeTruthy();
  });
});

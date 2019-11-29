import { TestBed } from '@angular/core/testing';

import { OrderCommentService } from './order-comment.service';

describe('OrderCommentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderCommentService = TestBed.get(OrderCommentService);
    expect(service).toBeTruthy();
  });
});

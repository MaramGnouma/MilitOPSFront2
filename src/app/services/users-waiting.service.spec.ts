import { TestBed } from '@angular/core/testing';

import { UsersWaitingService } from './users-waiting.service';

describe('UsersWaitingService', () => {
  let service: UsersWaitingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersWaitingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

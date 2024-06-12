import { TestBed } from '@angular/core/testing';

import { UsersAcceptésService } from './users-acceptés.service';

describe('UsersAcceptésService', () => {
  let service: UsersAcceptésService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersAcceptésService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

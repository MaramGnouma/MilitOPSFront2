import { TestBed } from '@angular/core/testing';

import { Authe2Service } from './authe2.service';

describe('Authe2Service', () => {
  let service: Authe2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Authe2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

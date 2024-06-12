import { TestBed } from '@angular/core/testing';

import { MontreService } from './montre.service';

describe('MontreService', () => {
  let service: MontreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MontreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

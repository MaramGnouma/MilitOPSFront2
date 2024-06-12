import { TestBed } from '@angular/core/testing';

import { MaterielsTerrainService } from './materiels-terrain.service';

describe('MaterielsTerrainService', () => {
  let service: MaterielsTerrainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterielsTerrainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

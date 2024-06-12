import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMaterielsTerrainComponent } from './detail-materiels-terrain.component';

describe('DetailMaterielsTerrainComponent', () => {
  let component: DetailMaterielsTerrainComponent;
  let fixture: ComponentFixture<DetailMaterielsTerrainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailMaterielsTerrainComponent]
    });
    fixture = TestBed.createComponent(DetailMaterielsTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaterielsTerrainComponent } from './add-materiels-terrain.component';

describe('AddMaterielsTerrainComponent', () => {
  let component: AddMaterielsTerrainComponent;
  let fixture: ComponentFixture<AddMaterielsTerrainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMaterielsTerrainComponent]
    });
    fixture = TestBed.createComponent(AddMaterielsTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

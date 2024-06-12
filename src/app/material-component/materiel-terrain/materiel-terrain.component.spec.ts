import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielTerrainComponent } from './materiel-terrain.component';

describe('MaterielTerrainComponent', () => {
  let component: MaterielTerrainComponent;
  let fixture: ComponentFixture<MaterielTerrainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterielTerrainComponent]
    });
    fixture = TestBed.createComponent(MaterielTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

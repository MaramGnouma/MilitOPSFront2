import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaterielTerrainComponent } from './edit-materiel-terrain.component';

describe('EditMaterielTerrainComponent', () => {
  let component: EditMaterielTerrainComponent;
  let fixture: ComponentFixture<EditMaterielTerrainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMaterielTerrainComponent]
    });
    fixture = TestBed.createComponent(EditMaterielTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

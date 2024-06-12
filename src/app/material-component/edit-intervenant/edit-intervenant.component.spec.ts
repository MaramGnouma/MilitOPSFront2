import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIntervenantComponent } from './edit-intervenant.component';

describe('EditIntervenantComponent', () => {
  let component: EditIntervenantComponent;
  let fixture: ComponentFixture<EditIntervenantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditIntervenantComponent]
    });
    fixture = TestBed.createComponent(EditIntervenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

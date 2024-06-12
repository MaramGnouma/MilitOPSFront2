import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIntervenantComponent } from './add-intervenant.component';

describe('AddIntervenantComponent', () => {
  let component: AddIntervenantComponent;
  let fixture: ComponentFixture<AddIntervenantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddIntervenantComponent]
    });
    fixture = TestBed.createComponent(AddIntervenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

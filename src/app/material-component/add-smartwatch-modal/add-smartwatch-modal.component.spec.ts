import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSmartwatchModalComponent } from './add-smartwatch-modal.component';

describe('AddSmartwatchModalComponent', () => {
  let component: AddSmartwatchModalComponent;
  let fixture: ComponentFixture<AddSmartwatchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSmartwatchModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSmartwatchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

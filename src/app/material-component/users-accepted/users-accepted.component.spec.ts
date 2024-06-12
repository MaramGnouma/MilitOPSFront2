import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAcceptedComponent } from './users-accepted.component';

describe('UsersAcceptedComponent', () => {
  let component: UsersAcceptedComponent;
  let fixture: ComponentFixture<UsersAcceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAcceptedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

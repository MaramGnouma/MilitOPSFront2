import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontreComponent } from './montre.component';

describe('MontreComponent', () => {
  let component: MontreComponent;
  let fixture: ComponentFixture<MontreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MontreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

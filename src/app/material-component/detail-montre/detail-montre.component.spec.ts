import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMontreComponent } from './detail-montre.component';

describe('DetailMontreComponent', () => {
  let component: DetailMontreComponent;
  let fixture: ComponentFixture<DetailMontreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMontreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailMontreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUserAccepteComponent } from './detail-user-accepte.component';

describe('DetailUserAccepteComponent', () => {
  let component: DetailUserAccepteComponent;
  let fixture: ComponentFixture<DetailUserAccepteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailUserAccepteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailUserAccepteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

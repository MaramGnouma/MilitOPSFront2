import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIntervenantComponent } from './list-intervenant.component';

describe('ListIntervenantComponent', () => {
  let component: ListIntervenantComponent;
  let fixture: ComponentFixture<ListIntervenantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListIntervenantComponent]
    });
    fixture = TestBed.createComponent(ListIntervenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

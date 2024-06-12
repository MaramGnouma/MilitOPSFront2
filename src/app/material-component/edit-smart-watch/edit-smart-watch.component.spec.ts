import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSmartWatchComponent } from './edit-smart-watch.component';

describe('EditSmartWatchComponent', () => {
  let component: EditSmartWatchComponent;
  let fixture: ComponentFixture<EditSmartWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSmartWatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSmartWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

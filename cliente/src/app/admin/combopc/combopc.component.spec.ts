import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombopcComponent } from './combopc.component';

describe('CombopcComponent', () => {
  let component: CombopcComponent;
  let fixture: ComponentFixture<CombopcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombopcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombopcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

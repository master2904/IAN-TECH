import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboCamaraNormalComponent } from './combo-camara-normal.component';

describe('ComboCamaraNormalComponent', () => {
  let component: ComboCamaraNormalComponent;
  let fixture: ComponentFixture<ComboCamaraNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboCamaraNormalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboCamaraNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

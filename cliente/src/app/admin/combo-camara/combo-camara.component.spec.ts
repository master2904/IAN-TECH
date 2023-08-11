import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboCamaraComponent } from './combo-camara.component';

describe('ComboCamaraComponent', () => {
  let component: ComboCamaraComponent;
  let fixture: ComponentFixture<ComboCamaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboCamaraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboCamaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

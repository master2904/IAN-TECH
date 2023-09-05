import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboCamaraTiendaComponent } from './combo-camara-tienda.component';

describe('ComboCamaraTiendaComponent', () => {
  let component: ComboCamaraTiendaComponent;
  let fixture: ComponentFixture<ComboCamaraTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboCamaraTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboCamaraTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

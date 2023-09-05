import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboPcTiendaComponent } from './combo-pc-tienda.component';

describe('ComboPcTiendaComponent', () => {
  let component: ComboPcTiendaComponent;
  let fixture: ComponentFixture<ComboPcTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboPcTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboPcTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

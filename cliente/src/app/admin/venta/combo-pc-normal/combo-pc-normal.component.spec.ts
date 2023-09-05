import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboPcNormalComponent } from './combo-pc-normal.component';

describe('ComboPcNormalComponent', () => {
  let component: ComboPcNormalComponent;
  let fixture: ComponentFixture<ComboPcNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboPcNormalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboPcNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

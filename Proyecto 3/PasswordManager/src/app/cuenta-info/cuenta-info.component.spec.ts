import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaInfoComponent } from './cuenta-info.component';

describe('CuentaInfoComponent', () => {
  let component: CuentaInfoComponent;
  let fixture: ComponentFixture<CuentaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

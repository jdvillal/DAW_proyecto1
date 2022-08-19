import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlaveroComponent } from './llavero.component';

describe('LlaveroComponent', () => {
  let component: LlaveroComponent;
  let fixture: ComponentFixture<LlaveroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LlaveroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlaveroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

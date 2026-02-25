import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Compn } from './compn';

describe('Compn', () => {
  let component: Compn;
  let fixture: ComponentFixture<Compn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Compn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

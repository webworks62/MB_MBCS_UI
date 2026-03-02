import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testpagesa } from './testpagesa';

describe('Testpagesa', () => {
  let component: Testpagesa;
  let fixture: ComponentFixture<Testpagesa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testpagesa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testpagesa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

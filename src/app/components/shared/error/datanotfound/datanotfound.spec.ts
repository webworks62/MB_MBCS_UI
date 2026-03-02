import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datanotfound } from './datanotfound';

describe('Datanotfound', () => {
  let component: Datanotfound;
  let fixture: ComponentFixture<Datanotfound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Datanotfound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Datanotfound);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

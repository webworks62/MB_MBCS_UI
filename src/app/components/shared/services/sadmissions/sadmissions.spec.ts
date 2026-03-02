import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sadmissions } from './sadmissions';

describe('Sadmissions', () => {
  let component: Sadmissions;
  let fixture: ComponentFixture<Sadmissions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sadmissions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sadmissions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

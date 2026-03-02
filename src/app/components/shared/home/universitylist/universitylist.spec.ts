import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Universitylist } from './universitylist';

describe('Universitylist', () => {
  let component: Universitylist;
  let fixture: ComponentFixture<Universitylist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Universitylist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Universitylist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

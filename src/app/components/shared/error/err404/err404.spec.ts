import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Err404 } from './err404';

describe('Err404', () => {
  let component: Err404;
  let fixture: ComponentFixture<Err404>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Err404]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Err404);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

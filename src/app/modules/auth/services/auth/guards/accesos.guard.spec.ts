import { TestBed } from '@angular/core/testing';

import { AccesosGuard } from './accesos.guard';

describe('AccesosGuard', () => {
  let guard: AccesosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccesosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

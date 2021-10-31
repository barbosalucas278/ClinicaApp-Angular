import { TestBed } from '@angular/core/testing';

import { SoloArministradoresGuard } from './solo-arministradores.guard';

describe('SoloArministradoresGuard', () => {
  let guard: SoloArministradoresGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SoloArministradoresGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AccesoMisTurnosGuard } from './acceso-mis-turnos.guard';

describe('AccesoMisTurnosGuard', () => {
  let guard: AccesoMisTurnosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccesoMisTurnosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

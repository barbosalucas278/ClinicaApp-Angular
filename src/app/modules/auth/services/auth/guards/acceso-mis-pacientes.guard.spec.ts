import { TestBed } from '@angular/core/testing';

import { AccesoMisPacientesGuard } from './acceso-mis-pacientes.guard';

describe('AccesoMisPacientesGuard', () => {
  let guard: AccesoMisPacientesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccesoMisPacientesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

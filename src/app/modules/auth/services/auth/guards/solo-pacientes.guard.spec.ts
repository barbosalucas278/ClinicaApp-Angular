import { TestBed } from '@angular/core/testing';

import { SoloPacientesGuard } from './solo-pacientes.guard';

describe('SoloPacientesGuard', () => {
  let guard: SoloPacientesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SoloPacientesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

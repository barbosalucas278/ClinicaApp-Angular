import { TestBed } from '@angular/core/testing';

import { SoloEspecialistasGuard } from './solo-especialistas.guard';

describe('SoloEspecialistasGuard', () => {
  let guard: SoloEspecialistasGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SoloEspecialistasGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

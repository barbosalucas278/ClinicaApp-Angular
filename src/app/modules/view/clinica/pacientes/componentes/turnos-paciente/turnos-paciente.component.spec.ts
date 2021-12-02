import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosPacienteComponent } from './turnos-paciente.component';

describe('TurnosPacienteComponent', () => {
  let component: TurnosPacienteComponent;
  let fixture: ComponentFixture<TurnosPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

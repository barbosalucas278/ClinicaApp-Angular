import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaPacientesComponent } from './grilla-pacientes.component';

describe('GrillaPacientesComponent', () => {
  let component: GrillaPacientesComponent;
  let fixture: ComponentFixture<GrillaPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrillaPacientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

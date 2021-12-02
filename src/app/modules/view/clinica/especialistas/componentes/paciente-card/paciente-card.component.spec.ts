import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteCardComponent } from './paciente-card.component';

describe('PacienteCardComponent', () => {
  let component: PacienteCardComponent;
  let fixture: ComponentFixture<PacienteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

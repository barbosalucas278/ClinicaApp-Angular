import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPAcientesComponent } from './tabla-pacientes.component';

describe('TablaPAcientesComponent', () => {
  let component: TablaPAcientesComponent;
  let fixture: ComponentFixture<TablaPAcientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaPAcientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPAcientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

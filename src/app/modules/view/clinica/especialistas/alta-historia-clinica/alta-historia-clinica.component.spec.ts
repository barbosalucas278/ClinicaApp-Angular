import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaHistoriaClinicaComponent } from './alta-historia-clinica.component';

describe('AltaHistoriaClinicaComponent', () => {
  let component: AltaHistoriaClinicaComponent;
  let fixture: ComponentFixture<AltaHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaHistoriaClinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

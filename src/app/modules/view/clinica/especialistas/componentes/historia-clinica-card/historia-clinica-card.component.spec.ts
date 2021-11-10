import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaClinicaCardComponent } from './historia-clinica-card.component';

describe('HistoriaClinicaCardComponent', () => {
  let component: HistoriaClinicaCardComponent;
  let fixture: ComponentFixture<HistoriaClinicaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaClinicaCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaClinicaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

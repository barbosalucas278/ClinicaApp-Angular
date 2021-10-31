import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioCardComponent } from './horario-card.component';

describe('HorarioCardComponent', () => {
  let component: HorarioCardComponent;
  let fixture: ComponentFixture<HorarioCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

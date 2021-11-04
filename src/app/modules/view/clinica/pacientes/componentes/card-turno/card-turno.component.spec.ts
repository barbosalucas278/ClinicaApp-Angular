import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTurnoComponent } from './card-turno.component';

describe('CardTurnoComponent', () => {
  let component: CardTurnoComponent;
  let fixture: ComponentFixture<CardTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoBarrasLateralesComponent } from './grafico-barras-laterales.component';

describe('GraficoBarrasLateralesComponent', () => {
  let component: GraficoBarrasLateralesComponent;
  let fixture: ComponentFixture<GraficoBarrasLateralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoBarrasLateralesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoBarrasLateralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

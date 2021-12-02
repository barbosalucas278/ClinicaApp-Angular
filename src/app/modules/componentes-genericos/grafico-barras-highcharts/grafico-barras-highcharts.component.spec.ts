import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoBarrasHighchartsComponent } from './grafico-barras-highcharts.component';

describe('GraficoBarrasLateralesComponent', () => {
  let component: GraficoBarrasHighchartsComponent;
  let fixture: ComponentFixture<GraficoBarrasHighchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoBarrasHighchartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoBarrasHighchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

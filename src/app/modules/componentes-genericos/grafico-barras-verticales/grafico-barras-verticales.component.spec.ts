import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoBarrasVerticalesComponent } from './grafico-barras-verticales.component';

describe('GraficoBarrasVerticalesComponent', () => {
  let component: GraficoBarrasVerticalesComponent;
  let fixture: ComponentFixture<GraficoBarrasVerticalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoBarrasVerticalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoBarrasVerticalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoTortaComponent } from './grafico-torta.component';

describe('GraficoTortaComponent', () => {
  let component: GraficoTortaComponent;
  let fixture: ComponentFixture<GraficoTortaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoTortaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoTortaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

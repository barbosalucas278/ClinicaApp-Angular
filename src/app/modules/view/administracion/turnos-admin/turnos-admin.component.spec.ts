import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosAdminComponent } from './turnos-admin.component';

describe('TurnosAdminComponent', () => {
  let component: TurnosAdminComponent;
  let fixture: ComponentFixture<TurnosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

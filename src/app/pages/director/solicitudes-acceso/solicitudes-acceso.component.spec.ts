import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesAccesoComponent } from './solicitudes-acceso.component';

describe('SolicitudesAccesoComponent', () => {
  let component: SolicitudesAccesoComponent;
  let fixture: ComponentFixture<SolicitudesAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesAccesoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoAdminDatosComponent } from './punto-admin-datos.component';

describe('PuntoAdminDatosComponent', () => {
  let component: PuntoAdminDatosComponent;
  let fixture: ComponentFixture<PuntoAdminDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntoAdminDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntoAdminDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

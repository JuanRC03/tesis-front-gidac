import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarDatoAdminDatosComponent } from './descargar-dato-admin-datos.component';

describe('DescargarDatoAdminDatosComponent', () => {
  let component: DescargarDatoAdminDatosComponent;
  let fixture: ComponentFixture<DescargarDatoAdminDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescargarDatoAdminDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescargarDatoAdminDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

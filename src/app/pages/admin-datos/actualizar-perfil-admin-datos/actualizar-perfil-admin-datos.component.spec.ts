import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPerfilAdminDatosComponent } from './actualizar-perfil-admin-datos.component';

describe('ActualizarPerfilAdminDatosComponent', () => {
  let component: ActualizarPerfilAdminDatosComponent;
  let fixture: ComponentFixture<ActualizarPerfilAdminDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarPerfilAdminDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarPerfilAdminDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

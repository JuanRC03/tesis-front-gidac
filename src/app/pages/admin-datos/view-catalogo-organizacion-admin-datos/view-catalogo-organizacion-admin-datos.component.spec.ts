import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCatalogoOrganizacionAdminDatosComponent } from './view-catalogo-organizacion-admin-datos.component';

describe('ViewCatalogoOrganizacionAdminDatosComponent', () => {
  let component: ViewCatalogoOrganizacionAdminDatosComponent;
  let fixture: ComponentFixture<ViewCatalogoOrganizacionAdminDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCatalogoOrganizacionAdminDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCatalogoOrganizacionAdminDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

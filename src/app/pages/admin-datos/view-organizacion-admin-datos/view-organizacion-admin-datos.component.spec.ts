import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrganizacionAdminDatosComponent } from './view-organizacion-admin-datos.component';

describe('ViewOrganizacionAdminDatosComponent', () => {
  let component: ViewOrganizacionAdminDatosComponent;
  let fixture: ComponentFixture<ViewOrganizacionAdminDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOrganizacionAdminDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOrganizacionAdminDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

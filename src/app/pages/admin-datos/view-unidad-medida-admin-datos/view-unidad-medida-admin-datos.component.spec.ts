import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUnidadMedidaAdminDatosComponent } from './view-unidad-medida-admin-datos.component';

describe('ViewUnidadMedidaAdminDatosComponent', () => {
  let component: ViewUnidadMedidaAdminDatosComponent;
  let fixture: ComponentFixture<ViewUnidadMedidaAdminDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUnidadMedidaAdminDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUnidadMedidaAdminDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProyectosAdminDatosComponent } from './view-proyectos-admin-datos.component';

describe('ViewProyectosAdminDatosComponent', () => {
  let component: ViewProyectosAdminDatosComponent;
  let fixture: ComponentFixture<ViewProyectosAdminDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProyectosAdminDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProyectosAdminDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

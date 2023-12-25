import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdministradorDatosComponent } from './view-administrador-datos.component';

describe('ViewAdministradorDatosComponent', () => {
  let component: ViewAdministradorDatosComponent;
  let fixture: ComponentFixture<ViewAdministradorDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdministradorDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAdministradorDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

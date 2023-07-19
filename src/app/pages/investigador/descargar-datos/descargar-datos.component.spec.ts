import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarDatosComponent } from './descargar-datos.component';

describe('DescargarDatosComponent', () => {
  let component: DescargarDatosComponent;
  let fixture: ComponentFixture<DescargarDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescargarDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescargarDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

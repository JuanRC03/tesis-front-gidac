import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConglomeradoAdminDatosComponent } from './conglomerado-admin-datos.component';

describe('ConglomeradoAdminDatosComponent', () => {
  let component: ConglomeradoAdminDatosComponent;
  let fixture: ComponentFixture<ConglomeradoAdminDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConglomeradoAdminDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConglomeradoAdminDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

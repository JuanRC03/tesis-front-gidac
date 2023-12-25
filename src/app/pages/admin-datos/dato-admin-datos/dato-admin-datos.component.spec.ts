import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatoAdminDatosComponent } from './dato-admin-datos.component';

describe('DatoAdminDatosComponent', () => {
  let component: DatoAdminDatosComponent;
  let fixture: ComponentFixture<DatoAdminDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatoAdminDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatoAdminDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAdminDatosComponent } from './dash-admin-datos.component';

describe('DashAdminDatosComponent', () => {
  let component: DashAdminDatosComponent;
  let fixture: ComponentFixture<DashAdminDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashAdminDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashAdminDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

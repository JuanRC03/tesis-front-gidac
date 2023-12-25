import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFamiliaAdminDatosComponent } from './view-familia-admin-datos.component';

describe('ViewFamiliaAdminDatosComponent', () => {
  let component: ViewFamiliaAdminDatosComponent;
  let fixture: ComponentFixture<ViewFamiliaAdminDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFamiliaAdminDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFamiliaAdminDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

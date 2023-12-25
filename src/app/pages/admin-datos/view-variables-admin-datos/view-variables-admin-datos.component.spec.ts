import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVariablesAdminDatosComponent } from './view-variables-admin-datos.component';

describe('ViewVariablesAdminDatosComponent', () => {
  let component: ViewVariablesAdminDatosComponent;
  let fixture: ComponentFixture<ViewVariablesAdminDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVariablesAdminDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVariablesAdminDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

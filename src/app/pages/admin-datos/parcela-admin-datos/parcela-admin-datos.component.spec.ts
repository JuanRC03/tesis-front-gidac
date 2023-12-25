import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelaAdminDatosComponent } from './parcela-admin-datos.component';

describe('ParcelaAdminDatosComponent', () => {
  let component: ParcelaAdminDatosComponent;
  let fixture: ComponentFixture<ParcelaAdminDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelaAdminDatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcelaAdminDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

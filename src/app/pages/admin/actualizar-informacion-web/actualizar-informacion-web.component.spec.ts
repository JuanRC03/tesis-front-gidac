import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarInformacionWebComponent } from './actualizar-informacion-web.component';

describe('ActualizarInformacionWebComponent', () => {
  let component: ActualizarInformacionWebComponent;
  let fixture: ComponentFixture<ActualizarInformacionWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarInformacionWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarInformacionWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

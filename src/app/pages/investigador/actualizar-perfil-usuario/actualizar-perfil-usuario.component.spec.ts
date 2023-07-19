import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPerfilUsuarioComponent } from './actualizar-perfil-usuario.component';

describe('ActualizarPerfilUsuarioComponent', () => {
  let component: ActualizarPerfilUsuarioComponent;
  let fixture: ComponentFixture<ActualizarPerfilUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarPerfilUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarPerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

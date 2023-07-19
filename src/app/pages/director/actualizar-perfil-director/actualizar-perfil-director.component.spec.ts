import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPerfilDirectorComponent } from './actualizar-perfil-director.component';

describe('ActualizarPerfilDirectorComponent', () => {
  let component: ActualizarPerfilDirectorComponent;
  let fixture: ComponentFixture<ActualizarPerfilDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarPerfilDirectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarPerfilDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

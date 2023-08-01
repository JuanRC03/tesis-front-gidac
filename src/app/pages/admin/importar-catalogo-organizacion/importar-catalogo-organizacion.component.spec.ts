import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarCatalogoOrganizacionComponent } from './importar-catalogo-organizacion.component';

describe('ImportarCatalogoOrganizacionComponent', () => {
  let component: ImportarCatalogoOrganizacionComponent;
  let fixture: ComponentFixture<ImportarCatalogoOrganizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportarCatalogoOrganizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportarCatalogoOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

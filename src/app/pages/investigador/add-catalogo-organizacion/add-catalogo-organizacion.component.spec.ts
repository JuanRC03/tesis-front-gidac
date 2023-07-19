import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatalogoOrganizacionComponent } from './add-catalogo-organizacion.component';

describe('AddCatalogoOrganizacionComponent', () => {
  let component: AddCatalogoOrganizacionComponent;
  let fixture: ComponentFixture<AddCatalogoOrganizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCatalogoOrganizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCatalogoOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

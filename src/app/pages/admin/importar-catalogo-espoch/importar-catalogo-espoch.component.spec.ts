import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarCatalogoEspochComponent } from './importar-catalogo-espoch.component';

describe('ImportarCatalogoEspochComponent', () => {
  let component: ImportarCatalogoEspochComponent;
  let fixture: ComponentFixture<ImportarCatalogoEspochComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportarCatalogoEspochComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportarCatalogoEspochComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

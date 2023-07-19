import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTipoProyectoAdminComponent } from './view-tipo-proyecto-admin.component';

describe('ViewTipoProyectoAdminComponent', () => {
  let component: ViewTipoProyectoAdminComponent;
  let fixture: ComponentFixture<ViewTipoProyectoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTipoProyectoAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTipoProyectoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTipoInvestigacionAdminComponent } from './view-tipo-investigacion-admin.component';

describe('ViewTipoInvestigacionAdminComponent', () => {
  let component: ViewTipoInvestigacionAdminComponent;
  let fixture: ComponentFixture<ViewTipoInvestigacionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTipoInvestigacionAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTipoInvestigacionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLineaInvestigacionAdminComponent } from './view-linea-investigacion-admin.component';

describe('ViewLineaInvestigacionAdminComponent', () => {
  let component: ViewLineaInvestigacionAdminComponent;
  let fixture: ComponentFixture<ViewLineaInvestigacionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLineaInvestigacionAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLineaInvestigacionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAreaInvestigacionesAdminComponent } from './view-area-investigaciones-admin.component';

describe('ViewAreaInvestigacionesAdminComponent', () => {
  let component: ViewAreaInvestigacionesAdminComponent;
  let fixture: ComponentFixture<ViewAreaInvestigacionesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAreaInvestigacionesAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAreaInvestigacionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

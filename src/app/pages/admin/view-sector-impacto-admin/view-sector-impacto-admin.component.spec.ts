import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSectorImpactoAdminComponent } from './view-sector-impacto-admin.component';

describe('ViewSectorImpactoAdminComponent', () => {
  let component: ViewSectorImpactoAdminComponent;
  let fixture: ComponentFixture<ViewSectorImpactoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSectorImpactoAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSectorImpactoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { ViewCatalogoOrganizacionInvestigadorComponent } from './view-catalogo-organizacion-investigador.component';

describe('ViewCatalogoOrganizacionInvestigadorComponent', () => {
  let component: ViewCatalogoOrganizacionInvestigadorComponent;
  let fixture: ComponentFixture<ViewCatalogoOrganizacionInvestigadorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCatalogoOrganizacionInvestigadorComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCatalogoOrganizacionInvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

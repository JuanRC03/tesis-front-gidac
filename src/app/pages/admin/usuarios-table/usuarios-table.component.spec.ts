import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { UsuariosTableComponent } from './usuarios-table.component';

describe('UsuariosTableComponent', () => {
  let component: UsuariosTableComponent;
  let fixture: ComponentFixture<UsuariosTableComponent>;
  

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosTableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

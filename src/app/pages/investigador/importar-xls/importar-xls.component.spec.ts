import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarXlsComponent } from './importar-xls.component';

describe('ImportarXlsComponent', () => {
  let component: ImportarXlsComponent;
  let fixture: ComponentFixture<ImportarXlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportarXlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportarXlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

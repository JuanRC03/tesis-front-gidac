import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertirXlsComponent } from './convertir-xls.component';

describe('ConvertirXlsComponent', () => {
  let component: ConvertirXlsComponent;
  let fixture: ComponentFixture<ConvertirXlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertirXlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertirXlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

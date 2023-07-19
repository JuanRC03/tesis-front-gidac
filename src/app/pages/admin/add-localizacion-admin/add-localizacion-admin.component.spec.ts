import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocalizacionAdminComponent } from './add-localizacion-admin.component';

describe('AddLocalizacionAdminComponent', () => {
  let component: AddLocalizacionAdminComponent;
  let fixture: ComponentFixture<AddLocalizacionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLocalizacionAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLocalizacionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

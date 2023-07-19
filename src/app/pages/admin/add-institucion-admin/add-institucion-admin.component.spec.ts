import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstitucionAdminComponent } from './add-institucion-admin.component';

describe('AddInstitucionAdminComponent', () => {
  let component: AddInstitucionAdminComponent;
  let fixture: ComponentFixture<AddInstitucionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInstitucionAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInstitucionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

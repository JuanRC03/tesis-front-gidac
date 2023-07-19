import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashDirecComponent } from './dash-direc.component';

describe('DashDirecComponent', () => {
  let component: DashDirecComponent;
  let fixture: ComponentFixture<DashDirecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashDirecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashDirecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

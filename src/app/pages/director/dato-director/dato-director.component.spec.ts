import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatoDirectorComponent } from './dato-director.component';

describe('DatoDirectorComponent', () => {
  let component: DatoDirectorComponent;
  let fixture: ComponentFixture<DatoDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatoDirectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatoDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelaDirectorComponent } from './parcela-director.component';

describe('ParcelaDirectorComponent', () => {
  let component: ParcelaDirectorComponent;
  let fixture: ComponentFixture<ParcelaDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelaDirectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcelaDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargaDatoDirectorComponent } from './descarga-dato-director.component';

describe('DescargaDatoDirectorComponent', () => {
  let component: DescargaDatoDirectorComponent;
  let fixture: ComponentFixture<DescargaDatoDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescargaDatoDirectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescargaDatoDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

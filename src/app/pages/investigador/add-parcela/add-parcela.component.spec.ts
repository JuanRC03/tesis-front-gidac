import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParcelaComponent } from './add-parcela.component';

describe('AddParcelaComponent', () => {
  let component: AddParcelaComponent;
  let fixture: ComponentFixture<AddParcelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParcelaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParcelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

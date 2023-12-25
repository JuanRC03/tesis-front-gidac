import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConglomeradoDirectorComponent } from './conglomerado-director.component';

describe('ConglomeradoDirectorComponent', () => {
  let component: ConglomeradoDirectorComponent;
  let fixture: ComponentFixture<ConglomeradoDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConglomeradoDirectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConglomeradoDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

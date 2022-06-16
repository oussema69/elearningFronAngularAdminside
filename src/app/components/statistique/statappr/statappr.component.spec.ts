import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatapprComponent } from './statappr.component';

describe('StatapprComponent', () => {
  let component: StatapprComponent;
  let fixture: ComponentFixture<StatapprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatapprComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatapprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

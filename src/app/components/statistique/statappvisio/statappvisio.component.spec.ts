import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatappvisioComponent } from './statappvisio.component';

describe('StatappvisioComponent', () => {
  let component: StatappvisioComponent;
  let fixture: ComponentFixture<StatappvisioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatappvisioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatappvisioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

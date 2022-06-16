import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatformComponent } from './statform.component';

describe('StatformComponent', () => {
  let component: StatformComponent;
  let fixture: ComponentFixture<StatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

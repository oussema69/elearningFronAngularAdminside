import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectAppComponent } from './affect-app.component';

describe('AffectAppComponent', () => {
  let component: AffectAppComponent;
  let fixture: ComponentFixture<AffectAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

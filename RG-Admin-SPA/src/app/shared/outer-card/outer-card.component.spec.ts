import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterCardComponent } from './outer-card.component';

describe('OuterCardComponent', () => {
  let component: OuterCardComponent;
  let fixture: ComponentFixture<OuterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuterCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

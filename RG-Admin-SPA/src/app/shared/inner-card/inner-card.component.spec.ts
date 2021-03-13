import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerCardComponent } from './inner-card.component';

describe('InnerCardComponent', () => {
  let component: InnerCardComponent;
  let fixture: ComponentFixture<InnerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResourceTypeComponent } from './create-resource-type.component';

describe('CreateResourceTypeComponent', () => {
  let component: CreateResourceTypeComponent;
  let fixture: ComponentFixture<CreateResourceTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateResourceTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateResourceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

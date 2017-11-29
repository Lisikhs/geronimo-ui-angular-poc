import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageGetComponent } from './message-get.component';

describe('MessageGetComponent', () => {
  let component: MessageGetComponent;
  let fixture: ComponentFixture<MessageGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

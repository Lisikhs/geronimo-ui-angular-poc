import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeronimoNavbarComponent } from './geronimo-navbar.component';

describe('GeronimoNavbarComponent', () => {
  let component: GeronimoNavbarComponent;
  let fixture: ComponentFixture<GeronimoNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeronimoNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeronimoNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

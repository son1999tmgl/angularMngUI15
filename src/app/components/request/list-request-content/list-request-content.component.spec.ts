import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestContentComponent } from './list-request-content.component';

describe('ListRequestContentComponent', () => {
  let component: ListRequestContentComponent;
  let fixture: ComponentFixture<ListRequestContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRequestContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRequestContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

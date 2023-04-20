import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFileNeacComponent } from './list-file-neac.component';

describe('ListFileNeacComponent', () => {
  let component: ListFileNeacComponent;
  let fixture: ComponentFixture<ListFileNeacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFileNeacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFileNeacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

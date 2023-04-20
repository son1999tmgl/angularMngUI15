import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderClientSearchComponent } from './render-client-search.component';

describe('RenderClientSearchComponent', () => {
  let component: RenderClientSearchComponent;
  let fixture: ComponentFixture<RenderClientSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderClientSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderClientSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

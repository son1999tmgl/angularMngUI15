import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderUserComponent } from './render-user.component';

describe('RenderUserComponent', () => {
  let component: RenderUserComponent;
  let fixture: ComponentFixture<RenderUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

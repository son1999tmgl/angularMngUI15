import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderAgencyComponent } from './render-agency.component';

describe('RenderAgencyComponent', () => {
  let component: RenderAgencyComponent;
  let fixture: ComponentFixture<RenderAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderAgencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

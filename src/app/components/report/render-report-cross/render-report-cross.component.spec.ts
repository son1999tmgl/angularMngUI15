import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderReportCrossComponent } from './render-report-cross.component';

describe('RenderReportCrossComponent', () => {
  let component: RenderReportCrossComponent;
  let fixture: ComponentFixture<RenderReportCrossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderReportCrossComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderReportCrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

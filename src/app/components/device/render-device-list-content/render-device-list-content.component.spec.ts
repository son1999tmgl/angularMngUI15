import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderDeviceListContentComponent } from './render-device-list-content.component';

describe('RenderDeviceListContentComponent', () => {
  let component: RenderDeviceListContentComponent;
  let fixture: ComponentFixture<RenderDeviceListContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderDeviceListContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderDeviceListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

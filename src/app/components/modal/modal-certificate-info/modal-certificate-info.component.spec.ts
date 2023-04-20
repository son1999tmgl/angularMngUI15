import { ComponentFixture, TestBed } from '@angular/core/testing';

import { modalCertificateInfoComponent } from './modal-certificate-info.component';

describe('modalCertificateInfoComponent', () => {
  let component: modalCertificateInfoComponent;
  let fixture: ComponentFixture<modalCertificateInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ modalCertificateInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(modalCertificateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

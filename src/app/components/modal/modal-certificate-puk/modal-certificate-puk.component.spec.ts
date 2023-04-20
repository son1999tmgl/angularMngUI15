import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCertificatePukComponent } from './modal-certificate-puk.component';

describe('ModalCertificatePukComponent', () => {
  let component: ModalCertificatePukComponent;
  let fixture: ComponentFixture<ModalCertificatePukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCertificatePukComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCertificatePukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

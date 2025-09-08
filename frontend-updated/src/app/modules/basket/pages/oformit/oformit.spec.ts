import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oformit } from './oformit';

describe('Oformit', () => {
  let component: Oformit;
  let fixture: ComponentFixture<Oformit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Oformit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Oformit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

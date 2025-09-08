import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Buyout } from './buyout';

describe('Buyout', () => {
  let component: Buyout;
  let fixture: ComponentFixture<Buyout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Buyout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Buyout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

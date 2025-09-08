import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Azots } from './azots';

describe('Azots', () => {
  let component: Azots;
  let fixture: ComponentFixture<Azots>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Azots]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Azots);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

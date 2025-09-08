import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OformitCard } from './oformit-card';

describe('OformitCard', () => {
  let component: OformitCard;
  let fixture: ComponentFixture<OformitCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OformitCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OformitCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

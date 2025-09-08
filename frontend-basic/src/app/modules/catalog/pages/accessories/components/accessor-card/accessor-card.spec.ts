import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessorCard } from './accessor-card';

describe('AccessorCard', () => {
  let component: AccessorCard;
  let fixture: ComponentFixture<AccessorCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessorCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessorCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

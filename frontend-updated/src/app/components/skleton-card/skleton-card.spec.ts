import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkletonCard } from './skleton-card';

describe('SkletonCard', () => {
  let component: SkletonCard;
  let fixture: ComponentFixture<SkletonCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkletonCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkletonCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

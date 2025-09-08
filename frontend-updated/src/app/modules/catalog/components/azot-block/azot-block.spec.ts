import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzotBlock } from './azot-block';

describe('AzotBlock', () => {
  let component: AzotBlock;
  let fixture: ComponentFixture<AzotBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AzotBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzotBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

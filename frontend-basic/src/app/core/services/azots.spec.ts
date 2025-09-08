import { TestBed } from '@angular/core/testing';

import { Azot } from './azots';

describe('Azots', () => {
  let service: Azot;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Azot);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

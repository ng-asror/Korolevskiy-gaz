import { TestBed } from '@angular/core/testing';

import { Accessor } from './accessor';

describe('Accessor', () => {
  let service: Accessor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Accessor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

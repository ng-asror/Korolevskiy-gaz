import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { oformitGuard } from './oformit-guard';

describe('oformitGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => oformitGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

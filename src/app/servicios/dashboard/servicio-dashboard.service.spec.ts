import { TestBed } from '@angular/core/testing';

import { ServicioDashboardService } from './servicio-dashboard.service';

describe('ServicioDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioDashboardService = TestBed.get(ServicioDashboardService);
    expect(service).toBeTruthy();
  });
});

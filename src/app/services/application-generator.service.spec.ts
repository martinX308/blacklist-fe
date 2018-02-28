import { TestBed, inject } from '@angular/core/testing';

import { ApplicationGeneratorService } from './application-generator.service';

describe('ApplicationGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationGeneratorService]
    });
  });

  it('should be created', inject([ApplicationGeneratorService], (service: ApplicationGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});

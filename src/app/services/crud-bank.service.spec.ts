import { TestBed } from '@angular/core/testing';

import { CrudBankService } from './crud-bank.service';

describe('CrudBankService', () => {
  let service: CrudBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import CreditController from '../src/Credit/CreditController';
import { describe, expect, it } from 'vitest';

describe('CreditController.getCreditPayments', () => {
  const controller = new CreditController();

  it('returns data payload for valid query', () => {
    const result = controller.getCreditPayments({
      sumOfCredit: '100000',
      creditTerm: '12',
      interestRateOfYear: '10',
      creditTermUnit: 'months',
      interestRateUnit: 'year',
    });

    expect(result.statusCode).toBe(200);
    expect(result.payload).toHaveProperty('data');
  });

  it('returns validation error for invalid units', () => {
    const result = controller.getCreditPayments({
      sumOfCredit: '100000',
      creditTerm: '12',
      interestRateOfYear: '10',
      creditTermUnit: 'weeks',
      interestRateUnit: 'hour',
    });

    expect(result.statusCode).toBe(200);
    expect(result.payload).toHaveProperty('error');

    const errorPayload = (result.payload as { error: { message: string } }).error;
    expect(errorPayload.message).toContain('creditTermUnit');
    expect(errorPayload.message).toContain('interestRateUnit');
  });

  it('returns validation error for out-of-range values', () => {
    const result = controller.getCreditPayments({
      sumOfCredit: '0',
      creditTerm: '99999',
      interestRateOfYear: '5000',
      creditTermUnit: 'months',
      interestRateUnit: 'year',
    });

    expect(result.statusCode).toBe(200);
    expect(result.payload).toHaveProperty('error');

    const errorPayload = (result.payload as { error: { message: string } }).error;
    expect(errorPayload.message).toContain('sumOfCredit');
    expect(errorPayload.message).toContain('creditTerm');
    expect(errorPayload.message).toContain('interestRateOfYear');
  });
});

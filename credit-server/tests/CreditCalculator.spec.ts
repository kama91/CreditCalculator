import CreditCalculator from '../src/Credit/CreditCalculator';
import CreditTerms from '../src/Credit/Models/CreditTerms';
import { addDays, format } from 'date-fns';
import { describe, expect, it } from 'vitest';

describe('CreditCalculator.getCreditSchedule', () => {
  const creditCalculator = new CreditCalculator();

  it('calculates schedule for 3 months', () => {
    const creditTerms = new CreditTerms({ sumOfCredit: 100000, creditTerm: 3, interestRateOfYear: 10 });

    const creditPayments = creditCalculator.getCreditSchedule(creditTerms);
    const expectedResult = getExpectedResultFor3Months();

    expect(creditPayments.overPayment).toBe(expectedResult.overPayment);
    expect(creditPayments.paymentsSchedule).toEqual(expectedResult.paymentDetails);
  });

  it('returns NaN overpayment for zero terms set', () => {
    const creditTerms = new CreditTerms({ sumOfCredit: 0, creditTerm: 0, interestRateOfYear: 0 });

    const creditPayments = creditCalculator.getCreditSchedule(creditTerms);

    expect(Number.isNaN(creditPayments.overPayment)).toBe(true);
    expect(creditPayments.paymentsSchedule.length).toBe(0);
  });

  it('returns NaN overpayment for zero credit term', () => {
    const creditTerms = new CreditTerms({ sumOfCredit: 1, creditTerm: 0, interestRateOfYear: 1 });

    const creditPayments = creditCalculator.getCreditSchedule(creditTerms);

    expect(Number.isNaN(creditPayments.overPayment)).toBe(true);
    expect(creditPayments.paymentsSchedule.length).toBe(0);
  });

  it('builds daily schedule with one-day steps', () => {
    const creditTerms = new CreditTerms({
      sumOfCredit: 10000,
      creditTerm: 3,
      interestRateOfYear: 10,
      creditTermUnit: 'days',
      interestRateUnit: 'year',
    });

    const creditPayments = creditCalculator.getCreditSchedule(creditTerms);
    const startDate = new Date();

    expect(creditPayments.paymentsSchedule[0].paymentDate).toBe(format(startDate, 'dd.MM.yyyy'));
    expect(creditPayments.paymentsSchedule[1].paymentDate).toBe(
      format(addDays(startDate, 1), 'dd.MM.yyyy')
    );
    expect(creditPayments.paymentsSchedule[2].paymentDate).toBe(
      format(addDays(startDate, 2), 'dd.MM.yyyy')
    );
  });

  it('treats 36.5% yearly rate equal to 0.1% daily rate for daily terms', () => {
    const termsWithYearRate = new CreditTerms({
      sumOfCredit: 10000,
      creditTerm: 10,
      interestRateOfYear: 36.5,
      creditTermUnit: 'days',
      interestRateUnit: 'year',
    });
    const termsWithDailyRate = new CreditTerms({
      sumOfCredit: 10000,
      creditTerm: 10,
      interestRateOfYear: 0.1,
      creditTermUnit: 'days',
      interestRateUnit: 'day',
    });

    const yearRateDetails = creditCalculator.getCreditSchedule(termsWithYearRate);
    const dailyRateDetails = creditCalculator.getCreditSchedule(termsWithDailyRate);

    expect(yearRateDetails.overPayment).toBeCloseTo(dailyRateDetails.overPayment, 2);
    expect(yearRateDetails.totalPayout).toBeCloseTo(dailyRateDetails.totalPayout, 2);
  });
});

const getExpectedResultFor3Months = () => {
  const date = new Date();
  return {
    paymentDetails: [
      {
        paymentNumber: 1,
        paymentDate: format(date, 'dd.MM.yyyy'),
        paymentBody: 33057.09,
        paymentPercent: 833.33,
        balanceDebt: 66942.91,
      },
      {
        paymentNumber: 2,
        paymentDate: format(new Date(date.setMonth(date.getMonth() + 1)), 'dd.MM.yyyy'),
        paymentBody: 33332.57,
        paymentPercent: 557.86,
        balanceDebt: 33610.34,
      },
      {
        paymentNumber: 3,
        paymentDate: format(new Date(date.setMonth(date.getMonth() + 1)), 'dd.MM.yyyy'),
        paymentBody: 33610.34,
        paymentPercent: 280.09,
        balanceDebt: 0,
      },
    ],
    monthlyPayment: 33057.09,
    overPayment: 1671.28,
    totalPayout: 101671.28,
  };
};

import CreditCalculator from '../src/Credit/CreditCalculator';
import CreditTerms from '../src/Credit/Models/CreditTerms';
import { assert } from 'chai'
import { format } from 'date-fns';

describe('getCreditDetails', () => {
    const creditCalculator = new CreditCalculator();

    describe('getCreditDetailsValidData', () => {
        it('getCreditDetailsFor3Months', () => {
            let creditTerms = new CreditTerms({ sumOfCredit: 100000, creditTerm: 3, interestRateOfYear: 10 });

            const creditPayments = creditCalculator.getCreditSchedule(creditTerms);

            const expectedResult = getExpectedResultFor3Months();

            assert.equal(expectedResult.overPayment, creditPayments.overPayment);
            assert.deepEqual(expectedResult.paymentDetails, creditPayments.paymentsSchedule);
        })
    })

    describe('getCreditDetailsInvalidData', () => {
        it('getCreditDetailsZeroCreditTerms', () => {
            let creditTerms = new CreditTerms({ sumOfCredit: 0, creditTerm: 0, interestRateOfYear: 0 });

            const creditPayments = creditCalculator.getCreditSchedule(creditTerms);

            assert.isNaN(creditPayments.overPayment);
            assert.equal(0, creditPayments.paymentsSchedule.length);
        })

        it('getCreditDetailsZeroCreditTerm', () => {
            let creditTerms = new CreditTerms({ sumOfCredit: 1, creditTerm: 0, interestRateOfYear: 1 });

            const creditPayments = creditCalculator.getCreditSchedule(creditTerms);

            assert.isNaN(creditPayments.overPayment);
            assert.equal(0, creditPayments.paymentsSchedule.length);
        })
    })
})

const getExpectedResultFor3Months = () => {
    let date = new Date();
    return {
        paymentDetails: [
            {
                paymentNumber: 1,
                paymentDate: format(date, 'dd/MM/yyyy'),
                paymentBody: 33057.09,
                paymentPercent: 833.33,
                balanceDebt: 66942.91
            },
            {
                paymentNumber: 2,
                paymentDate: format(new Date(date.setMonth(date.getMonth() + 1)), 'dd/MM/yyyy'),
                paymentBody: 33332.57,
                paymentPercent: 557.86,
                balanceDebt: 33610.34
            },
            {
                paymentNumber: 3,
                paymentDate: format(new Date(date.setMonth(date.getMonth() + 1)), 'dd/MM/yyyy'),
                paymentBody: 33610.34,
                paymentPercent: 280.09,
                balanceDebt: 0
            }
        ],
        monthlyPayment: 33057.09,
        overPayment: 1671.28,
        totalPayout: 101671.28
    }
}
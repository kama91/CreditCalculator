import CreditTerms from './Models/CreditTerms';
import CreditDetails from './Models/CreditDetails';
import PaymentsSchedule from './Models/PaymentsSchedule';
import { format } from 'date-fns';
import { addDays, addMonths } from 'date-fns';

class CreditCalculator {
    public getCreditSchedule = (creditTerms: CreditTerms) => {
        const paymentFactor = this.getPaymentFactor(creditTerms);
        const amountPayment = this.GetAmountPayment(creditTerms, paymentFactor);
        const paymentsSchedule: PaymentsSchedule[] = [];
        let date = new Date();
        let balanceDebt = creditTerms.sumOfCredit;
        for (let j = 0; j < creditTerms.creditTerm; ++j) {
            const paymentPercent = balanceDebt * paymentFactor;
            const paymentBody = amountPayment - paymentPercent;
            balanceDebt -= paymentBody;
            paymentsSchedule[j] = new PaymentsSchedule(
                {
                    paymentNumber: j + 1,
                    paymentDate: format(date, 'dd.MM.yyyy'),
                    paymentBody: parseFloat(paymentBody.toFixed(2)),
                    paymentPercent: parseFloat(paymentPercent.toFixed(2)),
                    balanceDebt: Math.abs(parseFloat(balanceDebt.toFixed(2)))
                });

            date = this.getNextPaymentDate(date, creditTerms);
        }

        const overPayment = this.GetOverPayment(creditTerms, amountPayment);
        const totalPayout = creditTerms.sumOfCredit + overPayment;
        const monthlyPayment = parseFloat((amountPayment - creditTerms.sumOfCredit * paymentFactor).toFixed(2));

        return new CreditDetails({ monthlyPayment, overPayment, totalPayout, paymentsSchedule: paymentsSchedule });
    }

    private getPaymentFactor(creditTerms: CreditTerms) {
        const yearlyRate = creditTerms.interestRateOfYear / 100;
        const dailyRate = creditTerms.interestRateUnit === 'day' ? yearlyRate : yearlyRate / 365;
        const periodInDays = creditTerms.creditTermUnit === 'days' ? 1 : 365 / 12;

        return dailyRate * periodInDays;
    }

    private getNextPaymentDate(currentDate: Date, creditTerms: CreditTerms): Date {
        if (creditTerms.creditTermUnit === 'days') {
            return addDays(currentDate, 1);
        }

        return addMonths(currentDate, 1);
    }

    private GetAmountPayment(creditConditions: CreditTerms, paymentFactor: number) {
        const creditTerm = creditConditions.creditTerm;
        const factor = paymentFactor * Math.pow(1 + paymentFactor, creditTerm) / (Math.pow(1 + paymentFactor, creditTerm) - 1);
        return creditConditions.sumOfCredit * factor;
    }

    private GetOverPayment(creditConditions: CreditTerms, amountPayment: number) {
        return parseFloat((amountPayment * creditConditions.creditTerm - creditConditions.sumOfCredit).toFixed(2));
    }
}

export default CreditCalculator;

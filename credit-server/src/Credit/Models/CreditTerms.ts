export type CreditTermUnit = 'months' | 'days';
export type InterestRateUnit = 'year' | 'day';

class CreditTerms {
    public sumOfCredit: number;
    public creditTerm: number;
    public interestRateOfYear: number;
    public creditTermUnit: CreditTermUnit;
    public interestRateUnit: InterestRateUnit;

    constructor(
        {
            sumOfCredit,
            creditTerm,
            interestRateOfYear,
            creditTermUnit = 'months',
            interestRateUnit = 'year'
        }:
            {
                sumOfCredit: number;
                creditTerm: number;
                interestRateOfYear: number;
                creditTermUnit?: CreditTermUnit;
                interestRateUnit?: InterestRateUnit;
            }) {
        this.sumOfCredit = sumOfCredit;
        this.creditTerm = creditTerm;
        this.interestRateOfYear = interestRateOfYear;
        this.creditTermUnit = creditTermUnit;
        this.interestRateUnit = interestRateUnit;
    }
}

export default CreditTerms;

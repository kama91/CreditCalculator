class CreditTerms {
    public sumOfCredit: number;
    public creditTerm: number;
    public interestRateOfYear: number;

    constructor({ sumOfCredit, creditTerm, interestRateOfYear }: { sumOfCredit: number; creditTerm: number; interestRateOfYear: number; }) {
        this.sumOfCredit = sumOfCredit;
        this.creditTerm = creditTerm;
        this.interestRateOfYear = interestRateOfYear;
    }
}

export default CreditTerms;
import type { CreditTermUnit, InterestRateUnit } from '../types/credit';

class CreditTermsDto {
  public sumOfCredit: string;
  public creditTerm: string;
  public interestRateOfYear: string;
  public creditTermUnit: CreditTermUnit;
  public interestRateUnit: InterestRateUnit;

  constructor(
    sumOfCredit: string,
    creditTerm: string,
    interestRateOfYear: string,
    creditTermUnit: CreditTermUnit,
    interestRateUnit: InterestRateUnit
  ) {
    this.sumOfCredit = sumOfCredit;
    this.creditTerm = creditTerm;
    this.interestRateOfYear = interestRateOfYear;
    this.creditTermUnit = creditTermUnit;
    this.interestRateUnit = interestRateUnit;
  }
}

export default CreditTermsDto;

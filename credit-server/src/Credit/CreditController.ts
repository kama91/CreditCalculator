import CreditCalculator from './CreditCalculator';
import CreditTerms from './Models/CreditTerms';
import { ErrorCode } from '../ErrorCode';

type ValidateResult = {
    invalidParameters: string[];
    validParameters?: {
        sumOfCredit: number;
        creditTerm: number;
        interestRateOfYear: number;
        creditTermUnit: 'months' | 'days';
        interestRateUnit: 'year' | 'day';
    };
};

type CreditQueryParams = Record<string, string | string[] | undefined>;

class CreditController {
    public getCreditPayments = (query: CreditQueryParams) => {

        const validateResult = this.validateQueryParameters(query);
        if (validateResult.invalidParameters.length > 0) {
            return {
                statusCode: 200,
                payload: {
                    error: { errorCode: ErrorCode.BadRequest, message: 'Request has invalid parameter(-s) ' + validateResult.invalidParameters },
                }
            };
        }

        const lendingTerms = new CreditTerms(validateResult.validParameters!);
        const creditCalculator = new CreditCalculator();
        const details = creditCalculator.getCreditSchedule(lendingTerms);

        return {
            statusCode: 200,
            payload: { data: details }
        };
    }

    private validateQueryParameters = (query: CreditQueryParams): ValidateResult => {
        let result: ValidateResult = { invalidParameters: [] };
        let sumOfCredit: number;
        let creditTerm: number;
        let interestRateOfYear: number;
        let creditTermUnit: 'months' | 'days' = 'months';
        let interestRateUnit: 'year' | 'day' = 'year';

        let numberValidationResult: { isNumber: boolean; number: number; };
        numberValidationResult = this.validateOnNumber(this.getQueryParam(query, 'sumOfCredit'));
        if (!numberValidationResult.isNumber || numberValidationResult.number <= 0 || numberValidationResult.number > 1_000_000_000) {
            result.invalidParameters.push('sumOfCredit');
        }
        sumOfCredit = numberValidationResult.number;

        numberValidationResult = this.validateOnNumber(this.getQueryParam(query, 'creditTerm'));
        if (!numberValidationResult.isNumber || numberValidationResult.number <= 0 || numberValidationResult.number > 1200) {
            result.invalidParameters.push('creditTerm');
        }
        creditTerm = numberValidationResult.number;

        numberValidationResult = this.validateOnNumber(this.getQueryParam(query, 'interestRateOfYear'));
        if (!numberValidationResult.isNumber || numberValidationResult.number <= 0 || numberValidationResult.number > 1000) {
            result.invalidParameters.push('interestRateOfYear');
        }

        interestRateOfYear = numberValidationResult.number;

        const creditTermUnitRaw = this.getQueryParam(query, 'creditTermUnit');
        if (creditTermUnitRaw === 'months' || creditTermUnitRaw === 'days') {
            creditTermUnit = creditTermUnitRaw;
        } else {
            result.invalidParameters.push('creditTermUnit');
        }

        const interestRateUnitRaw = this.getQueryParam(query, 'interestRateUnit');
        if (interestRateUnitRaw === 'year' || interestRateUnitRaw === 'day') {
            interestRateUnit = interestRateUnitRaw;
        } else {
            result.invalidParameters.push('interestRateUnit');
        }

        if (result.invalidParameters.length == 0) {
            result.validParameters = { sumOfCredit, creditTerm, interestRateOfYear, creditTermUnit, interestRateUnit };
        }

        return result;
    }

    private getQueryParam(query: CreditQueryParams, key: string): string {
        const value = query[key];
        if (value === undefined || value === null) {
            return '';
        }
        return Array.isArray(value) ? value[0].toString() : value.toString();
    }

    private validateOnNumber(n: string) {
        let result: { isNumber: boolean; number: number; };
        if (/^\d+(\.\d+)?$/.test(n)) {
            result = { isNumber: true, number: parseFloat(n) }
        }
        else {
            result = { isNumber: false, number: -1 }
        }

        return result;
    }
}

export default CreditController;

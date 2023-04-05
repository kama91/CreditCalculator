import { Request, Response } from 'express';
import CreditCalculator from './CreditCalculator';
import CreditDetails from './Models/CreditDetails';
import CreditTerms from './Models/CreditTerms';
import { ParsedQs } from 'qs';
import { ErrorCode } from '../ErrorCode';


class CreditController {
    public getCreditPayments = (req: Request, res: Response<{}, CreditDetails>) => {

        const validateResult = this.validateQueryParameters(req.query);
        if (validateResult.invalidParameters.length > 0) {
            return res.status(200).json({
                error: { errorCode: ErrorCode.BadRequest, message: 'Request has invalid parameter(-s) ' + validateResult.invalidParameters },
            });
        }

        const lendingTerms = new CreditTerms({ sumOfCredit: validateResult.validParameters[0], creditTerm: validateResult.validParameters[1], interestRateOfYear: validateResult.validParameters[2] });
        const creditCalculator = new CreditCalculator();
        const details = creditCalculator.getCreditSchedule(lendingTerms);

        return res.status(200).json({ data: details });
    }

    private validateQueryParameters = (query: ParsedQs) => {
        let result = { invalidParameters: [], validParameters: [] };
        let sumOfCredit: number;
        let creditTerm: number;
        let interestRateOfYear: number;

        let numberValidationResult: { isNumber: boolean; number: number; };
        numberValidationResult = this.validateOnNumber(query.sumOfCredit.toString());
        if (!numberValidationResult.isNumber) {
            result.invalidParameters.push('sumOfCredit');
        }
        sumOfCredit = numberValidationResult.number;

        numberValidationResult = this.validateOnNumber(query.creditTerm.toString());
        if (!numberValidationResult.isNumber) {
            result.invalidParameters.push('creditTerm');
        }
        creditTerm = numberValidationResult.number;

        numberValidationResult = this.validateOnNumber(query.interestRateOfYear.toString());
        if (!numberValidationResult.isNumber) {
            result.invalidParameters.push('interestRateOfYear');
        }

        interestRateOfYear = numberValidationResult.number;

        if (result.invalidParameters.length == 0) {
            result.validParameters.push(sumOfCredit);
            result.validParameters.push(creditTerm);
            result.validParameters.push(interestRateOfYear);
        }

        return result;
    }

    private validateOnNumber(n: string) {
        let result: { isNumber: boolean; number: number; };
        if (/^[0-9]+$/.test(n)) {
            result = { isNumber: true, number: parseFloat(n) }
        }
        else {
            result = { isNumber: false, number: -1 }
        }

        return result;
    }
}

export default CreditController;

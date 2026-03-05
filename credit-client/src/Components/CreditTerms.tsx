import { useMemo, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreditTerms.css';
import { CreditApiService } from '../Services/CreditApiService';
import CreditTermsDto from '../Models/CreditTermsDto';
import type { CreditTermUnit, InterestRateUnit } from '../types/credit';

const CreditTerms = () => {
  const navigate = useNavigate();
  const [sumOfCredit, setSumOfCredit] = useState<string>('100000');
  const [creditTerm, setCreditTerm] = useState<string>('36');
  const [interestRateOfYear, setInterestRateOfYear] = useState<string>('5');
  const [creditTermUnit, setCreditTermUnit] = useState<CreditTermUnit>('months');
  const [interestRateUnit, setInterestRateUnit] = useState<InterestRateUnit>('year');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const creditApiService = useMemo(() => new CreditApiService(), []);

  const isPositiveNumber = (value: string): boolean => {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) && parsedValue > 0;
  };

  const canSubmit =
    isPositiveNumber(sumOfCredit) &&
    isPositiveNumber(creditTerm) &&
    isPositiveNumber(interestRateOfYear);

  const setValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    switch (e.target.name) {
      case 'sumOfCredit':
        setSumOfCredit(e.target.value);
        break;
      case 'creditTerm':
        setCreditTerm(e.target.value);
        break;
      case 'interestRateOfYear':
        setInterestRateOfYear(e.target.value);
        break;
      case 'creditTermUnit':
        setCreditTermUnit(e.target.value as CreditTermUnit);
        break;
      case 'interestRateUnit':
        setInterestRateUnit(e.target.value as InterestRateUnit);
        break;
      default:
        break;
    }
  };

  const getCreditDetails = async () => {
    if (!canSubmit || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    const creditTerms = new CreditTermsDto(
      sumOfCredit,
      creditTerm,
      interestRateOfYear,
      creditTermUnit,
      interestRateUnit
    );
    const result = await creditApiService.getCreditDetails(creditTerms);
    setIsSubmitting(false);

    switch (result.kind) {
      case 'success':
        navigate('/creditDetails', { state: result.data });
        return;
      case 'apiError':
        alert(`${result.error.errorCode} ${result.error.message}`);
        return;
      case 'networkError':
        alert(result.message);
        return;
      default:
        return;
    }
  };

  return (
    <div className="credit-terms">
      <div className="flex-container form-fields">
        <p>Сумма кредита (руб.)</p>
        <input name="sumOfCredit" type="number" min="1" value={sumOfCredit} onChange={setValue} />

        <p>Срок кредита</p>
        <div className="input-with-unit">
          <input name="creditTerm" type="number" min="1" value={creditTerm} onChange={setValue} />
          <select name="creditTermUnit" value={creditTermUnit} onChange={setValue}>
            <option value="months">месяцы</option>
            <option value="days">дни</option>
          </select>
        </div>

        <p>Процентная ставка (%)</p>
        <div className="input-with-unit">
          <input
            name="interestRateOfYear"
            type="number"
            min="0.000001"
            step="0.000001"
            value={interestRateOfYear}
            onChange={setValue}
          />
          <select name="interestRateUnit" value={interestRateUnit} onChange={setValue}>
            <option value="year">в год</option>
            <option value="day">в день</option>
          </select>
        </div>
      </div>
      <div className="flex-container">
        <button
          className="action-button calculate"
          onClick={getCreditDetails}
          disabled={!canSubmit || isSubmitting}
        >
          {isSubmitting ? 'Расчет...' : 'Рассчитать'}
        </button>
      </div>
    </div>
  );
};

export default CreditTerms;

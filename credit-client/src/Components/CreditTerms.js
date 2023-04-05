import { React, useState } from 'react';
import './CreditTerms.css'
import { CreditApiService } from '../Services/CreditApiService'
import CreditTermsDto from '../Models/CreditTermsDto';
import { useNavigate } from "react-router-dom";

const CreditTerms = () => {
    const className = 'CreditTerms_';
    const navigate = useNavigate();
    const [showCalculateBtn, setShowCalculateBtn] = useState(true);
    const [sumOfCredit, setSumOfCredit] = useState('100000');
    const [creditTerm, setCreditTerm] = useState('36');
    const [interestRateOfYear, setInterestRateOfYear] = useState('5');

    const creditApiService = new CreditApiService();

    const setValue = (e) => {
        setShowCalculateBtn(isValidValue(e.target.value));

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
            default:
                console.log(className + setValue.name + ' property name is undefined');
                break;
        }
    }

    const isValidValue = (value) => {
        return value && value != '' && value != 0;
    }

    const getCreditDetails = async () => {
        const creditTerms = new CreditTermsDto(sumOfCredit, creditTerm, interestRateOfYear);
        const result = await creditApiService.getCreditDetails(creditTerms);
        if (result.data) {
            navigate('/creditDetails', { state: result.data });
        }
        else if (result.error) {
            alert(result.error.errorCode + ' ' + result.error.message);
        }
        else {
            alert(result);
        }
    }
    return (
        <>
            <div className='credit-terms'>
                <div className='flex-container'>
                    <p>Сумма кредита(руб.)</p>
                    <input name='sumOfCredit' type="number" value={sumOfCredit} onChange={e => setValue(e)} />
                    <p>Срок кредита(мес.)</p>
                    <input name='creditTerm' type="number" value={creditTerm} onChange={e => setValue(e)} />
                    <p>Процентная ставка(%)</p>
                    <input name='interestRateOfYear' type="number" value={interestRateOfYear} onChange={e => setValue(e)} />
                </div>
                {showCalculateBtn && <div className='flex-container'>
                    <button className='calculate' onClick={getCreditDetails}>Рассчитать</button>
                </div>}
            </div>
        </>
    );
}

export default CreditTerms; 
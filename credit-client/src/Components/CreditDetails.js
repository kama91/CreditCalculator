import './CreditDetails.css'
import { useLocation } from "react-router-dom";
import { useState } from 'react';

const CreditDetails = () => {
    {
        const [showSchedule, setShowSchedule] = useState(false);
        const { state } = useLocation();

        return (
            <>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Общая выплата</th>
                                <th>Переплата по кредиту</th>
                                <th>Ежемесячный платеж</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{state.totalPayout}</td>
                                <td>{state.overPayment}</td>
                                <td>{state.monthlyPayment}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='show-payments-schedule' onClick={e => setShowSchedule(true)}>Таблица платежей</button>
                    {showSchedule && <table>
                        <thead className='schedule-headers'>
                            <tr>
                                <th>Номер платежа</th>
                                <th>Дата платежа</th>
                                <th>Платеж по телу кредита</th>
                                <th>Платеж по процентам</th>
                                <th>Остаток долга</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.paymentsSchedule.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{val.paymentNumber}</td>
                                        <td>{val.paymentDate}</td>
                                        <td>{val.paymentBody}</td>
                                        <td>{val.paymentPercent}</td>
                                        <td>{val.balanceDebt}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>}
                </div>
            </>
        );
    }
}

export default CreditDetails;
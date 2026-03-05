import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './CreditDetails.css';
import type { CreditDetailsDto } from '../types/credit';
import SummaryCards from './SummaryCards';
import PaymentScheduleTable from './PaymentScheduleTable';

const CreditDetails = () => {
  const [showSchedule, setShowSchedule] = useState<boolean>(false);
  const location = useLocation();
  const state = location.state as CreditDetailsDto | undefined;

  if (!state) {
    return <div>Данные расчета недоступны. Выполните расчет заново.</div>;
  }

  return (
    <div className="credit-details-page">
      <SummaryCards details={state} />
      <button
        className="action-button show-payments-schedule"
        onClick={() => setShowSchedule((prev) => !prev)}
      >
        {showSchedule ? 'Скрыть таблицу платежей' : 'Таблица платежей'}
      </button>
      {showSchedule && <PaymentScheduleTable schedule={state.paymentsSchedule} />}
    </div>
  );
};

export default CreditDetails;

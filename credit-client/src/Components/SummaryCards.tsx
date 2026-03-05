import type { CreditDetailsDto } from '../types/credit';

interface SummaryCardsProps {
  details: CreditDetailsDto;
}

const SummaryCards = ({ details }: SummaryCardsProps) => {
  return (
    <section className="summary-cards" aria-label="Итоги кредита">
      <article className="summary-card">
        <h3>Общая выплата</h3>
        <p>{details.totalPayout}</p>
      </article>
      <article className="summary-card">
        <h3>Переплата по кредиту</h3>
        <p>{details.overPayment}</p>
      </article>
      <article className="summary-card">
        <h3>Платеж за период</h3>
        <p>{details.monthlyPayment}</p>
      </article>
    </section>
  );
};

export default SummaryCards;

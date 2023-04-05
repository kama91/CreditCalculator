import PaymentsSchedule from "./PaymentsSchedule";

class CreditDetails {
    public paymentsSchedule: PaymentsSchedule[];
    public overPayment: number;
    public totalPayout: number;
    public monthlyPayment: number;

    constructor({ monthlyPayment, overPayment, totalPayout, paymentsSchedule: paymentsSchedule }: { monthlyPayment: number, overPayment: number, totalPayout: number; paymentsSchedule: PaymentsSchedule[]; }) {
        this.monthlyPayment = monthlyPayment;
        this.overPayment = overPayment;
        this.totalPayout = totalPayout;
        this.paymentsSchedule = paymentsSchedule;
    }
}

export default CreditDetails;
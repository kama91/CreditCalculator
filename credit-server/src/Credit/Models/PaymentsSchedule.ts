
class PaymentsSchedule {
    public paymentNumber: number;
    public paymentDate: string;
    public paymentBody: number;
    public paymentPercent: number;
    public balanceDebt: number;

    constructor({ paymentNumber, paymentDate, paymentBody, paymentPercent, balanceDebt }:
        { paymentNumber: number; paymentDate: string; paymentBody: number; paymentPercent: number; balanceDebt: number; }) {
        this.paymentNumber = paymentNumber;
        this.paymentDate = paymentDate;
        this.paymentBody = paymentBody;
        this.paymentPercent = paymentPercent;
        this.balanceDebt = balanceDebt;
    }
}

export default PaymentsSchedule;
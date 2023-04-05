class CreditDetailsDto {
    constructor(monthlyPayment, overPayment, totalPayout, paymentsSchedule) {
        this.monthlyPayment = monthlyPayment;
        this.overPayment = overPayment;
        this.totalPayout = totalPayout;
        this.paymentsSchedule = paymentsSchedule;
    }
}

export default CreditDetailsDto;
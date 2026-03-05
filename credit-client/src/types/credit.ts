export interface PaymentScheduleItem {
  paymentNumber: number;
  paymentDate: string;
  paymentBody: number;
  paymentPercent: number;
  balanceDebt: number;
}

export type CreditTermUnit = 'months' | 'days';
export type InterestRateUnit = 'year' | 'day';

export interface CreditDetailsDto {
  monthlyPayment: number;
  overPayment: number;
  totalPayout: number;
  paymentsSchedule: PaymentScheduleItem[];
}

export interface CreditError {
  errorCode: number;
  message: string;
}

export interface CreditApiSuccessResponse {
  data: CreditDetailsDto;
}

export interface CreditApiErrorResponse {
  error: CreditError;
}

export type CreditApiResponse = CreditApiSuccessResponse | CreditApiErrorResponse;

export type CreditApiResult =
  | { kind: 'success'; data: CreditDetailsDto }
  | { kind: 'apiError'; error: CreditError }
  | { kind: 'networkError'; message: string };

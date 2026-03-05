import type CreditTermsDto from '../Models/CreditTermsDto';
import type { CreditApiResponse, CreditApiResult } from '../types/credit';

const defaultApiBaseUrl = 'http://localhost:5000/api/credit';
const requestTimeoutMs = 10_000;

const getApiBaseUrl = (): string => {
  const rawApiBaseUrl = (process.env.REACT_APP_API_BASE_URL || defaultApiBaseUrl).trim();

  try {
    const parsedUrl = new URL(rawApiBaseUrl);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return defaultApiBaseUrl;
    }
    return rawApiBaseUrl.replace(/\/$/, '');
  } catch {
    return defaultApiBaseUrl;
  }
};

export class CreditApiService {
  getCreditDetails = async (creditTerms: CreditTermsDto): Promise<CreditApiResult> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), requestTimeoutMs);

    const options: RequestInit = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      signal: controller.signal,
    };

    try {
      const queryParameters = new URLSearchParams({
        sumOfCredit: creditTerms.sumOfCredit,
        creditTerm: creditTerms.creditTerm,
        interestRateOfYear: creditTerms.interestRateOfYear,
        creditTermUnit: creditTerms.creditTermUnit,
        interestRateUnit: creditTerms.interestRateUnit,
      });

      const request = `${getApiBaseUrl()}/detail?${queryParameters.toString()}`;

      const response = await fetch(request, options);
      return this.processingResponse(response);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return { kind: 'networkError', message: 'Request timeout. Please try again.' };
      }
      return { kind: 'networkError', message: 'Request failed. Please try again.' };
    } finally {
      clearTimeout(timeoutId);
    }
  };

  private processingResponse = async (response: Response): Promise<CreditApiResult> => {
    const responseBody = (await response.json()) as CreditApiResponse | undefined;

    if (response.status !== 200 && responseBody && 'error' in responseBody) {
      return { kind: 'apiError', error: responseBody.error };
    }

    if (response.status !== 200) {
      return { kind: 'networkError', message: 'Request failed. Please try again.' };
    }

    if (!responseBody) {
      return { kind: 'networkError', message: 'Invalid server response.' };
    }

    if ('data' in responseBody) {
      return { kind: 'success', data: responseBody.data };
    }

    return { kind: 'apiError', error: responseBody.error };
  };
}

export default CreditApiService;

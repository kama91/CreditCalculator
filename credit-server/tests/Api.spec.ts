import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { buildServer } from '../src/server';

const app = buildServer();

describe('API integration', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns health status', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('healthy');
  });

  it('returns credit details for valid request', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/credit/detail',
      query: {
        sumOfCredit: '100000',
        creditTerm: '12',
        interestRateOfYear: '10',
        creditTermUnit: 'months',
        interestRateUnit: 'year',
      },
    });

    const payload = response.json() as { data?: unknown; error?: unknown };
    expect(response.statusCode).toBe(200);
    expect(payload.data).toBeDefined();
    expect(payload.error).toBeUndefined();
  });

  it('returns validation error payload for bad request values', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/credit/detail',
      query: {
        sumOfCredit: '0',
        creditTerm: '0',
        interestRateOfYear: '0',
        creditTermUnit: 'months',
        interestRateUnit: 'year',
      },
    });

    const payload = response.json() as { data?: unknown; error?: { errorCode: number; message: string } };
    expect(response.statusCode).toBe(200);
    expect(payload.error?.errorCode).toBe(1);
    expect(payload.error?.message).toContain('sumOfCredit');
    expect(payload.data).toBeUndefined();
  });

  it('blocks disallowed origins with 403', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/credit/detail',
      headers: {
        origin: 'http://evil.example',
      },
      query: {
        sumOfCredit: '100000',
        creditTerm: '12',
        interestRateOfYear: '10',
        creditTermUnit: 'months',
        interestRateUnit: 'year',
      },
    });

    const payload = response.json() as { error?: { errorCode: number; message: string } };
    expect(response.statusCode).toBe(403);
    expect(payload.error?.message).toBe('Origin is not allowed');
  });
});

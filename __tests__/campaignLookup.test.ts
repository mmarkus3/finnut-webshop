import { fetchCampaignByCodeFromDb, normalizeCampaignCode } from '@/services/campaign';
import { fetchCampaignByCode } from '@/hooks/campaignLookup';

describe('campaign lookup service', () => {
  it('normalizes campaign code with trim', () => {
    expect(normalizeCampaignCode('  SUMMER-20  ')).toBe('SUMMER-20');
  });

  it('calls campaign endpoint with company and encoded code', async () => {
    const request = jest.fn().mockResolvedValue({ data: { code: 'SUMMER-20', name: 'Summer' } });

    const campaign = await fetchCampaignByCodeFromDb(' SUMMER-20 ', { request } as never);

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      url: `/campaigns/company/${process.env.EXPO_PUBLIC_COMPANY!}/campaign/SUMMER-20`,
    });
    expect(campaign).toEqual({ code: 'SUMMER-20', name: 'Summer' });
  });

  it('returns null and skips request for blank code', async () => {
    const request = jest.fn();
    const campaign = await fetchCampaignByCodeFromDb('   ', { request } as never);
    expect(campaign).toBeNull();
    expect(request).not.toHaveBeenCalled();
  });

  it('exposes helper fetchCampaignByCode using same service behavior', async () => {
    const request = jest.fn().mockResolvedValue({ data: { code: 'VIP' } });
    const campaign = await fetchCampaignByCode('VIP', { request } as never);
    expect(campaign).toEqual({ code: 'VIP' });
  });
});

import { useCampaignLookup } from '@/hooks/campaignLookup';
import { Campaign } from '@/types/campaign';
import React, { useEffect } from 'react';
import renderer from 'react-test-renderer';

interface Snapshot {
  campaign: Campaign | null;
  isLoading: boolean;
  error: string | null;
}

describe('useCampaignLookup', () => {
  it('transitions from idle -> loading -> success and reset', async () => {
    let resolveRequest: ((value: { data: { code: string; name: string } }) => void) | null = null;
    const request = jest.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = resolve;
        })
    );
    const snapshots: Snapshot[] = [];

    function Harness({ onReady }: { onReady: (api: { fetchCampaignByCode: (code: string) => Promise<Campaign | null>; reset: () => void }) => void }) {
      const { campaign, isLoading, error, fetchCampaignByCode, reset } = useCampaignLookup({ request } as never);

      useEffect(() => {
        snapshots.push({ campaign, isLoading, error });
      }, [campaign, isLoading, error]);

      useEffect(() => {
        onReady({ fetchCampaignByCode, reset });
      }, [fetchCampaignByCode, reset, onReady]);

      return null;
    }

    let api: { fetchCampaignByCode: (code: string) => Promise<Campaign | null>; reset: () => void } | null = null;

    await renderer.act(async () => {
      renderer.create(<Harness onReady={(next) => { api = next; }} />);
    });

    let pendingLookup: Promise<Campaign | null> | null = null;
    await renderer.act(async () => {
      pendingLookup = api!.fetchCampaignByCode(' SAVE10 ');
    });

    expect(request).toHaveBeenCalledTimes(1);
    expect(snapshots.some((state) => state.isLoading)).toBe(true);

    await renderer.act(async () => {
      resolveRequest!({ data: { code: 'SAVE10', name: 'Save 10' } });
      await pendingLookup;
    });

    expect(snapshots[snapshots.length - 1]).toEqual({
      campaign: { code: 'SAVE10', name: 'Save 10' },
      isLoading: false,
      error: null,
    });

    await renderer.act(async () => {
      api!.reset();
    });

    expect(snapshots[snapshots.length - 1]).toEqual({
      campaign: null,
      isLoading: false,
      error: null,
    });
  });

  it('returns deterministic empty-code state without request and handles request errors', async () => {
    const request = jest
      .fn()
      .mockResolvedValueOnce({ data: { code: 'GOOD' } })
      .mockRejectedValueOnce(new Error('network'));

    const snapshots: Snapshot[] = [];

    function Harness({ onReady }: { onReady: (api: { fetchCampaignByCode: (code: string) => Promise<Campaign | null> }) => void }) {
      const { campaign, isLoading, error, fetchCampaignByCode } = useCampaignLookup({ request } as never);

      useEffect(() => {
        snapshots.push({ campaign, isLoading, error });
      }, [campaign, isLoading, error]);

      useEffect(() => {
        onReady({ fetchCampaignByCode });
      }, [fetchCampaignByCode, onReady]);

      return null;
    }

    let api: { fetchCampaignByCode: (code: string) => Promise<Campaign | null> } | null = null;

    await renderer.act(async () => {
      renderer.create(<Harness onReady={(next) => { api = next; }} />);
    });

    await renderer.act(async () => {
      const result = await api!.fetchCampaignByCode('   ');
      expect(result).toBeNull();
    });

    expect(request).not.toHaveBeenCalled();
    expect(snapshots[snapshots.length - 1]).toEqual({
      campaign: null,
      isLoading: false,
      error: 'campaign-code-empty',
    });

    await renderer.act(async () => {
      await api!.fetchCampaignByCode('GOOD');
    });

    await renderer.act(async () => {
      const result = await api!.fetchCampaignByCode('BROKEN');
      expect(result).toBeNull();
    });

    expect(request).toHaveBeenCalledTimes(2);
    expect(snapshots[snapshots.length - 1]).toEqual({
      campaign: null,
      isLoading: false,
      error: 'campaign-load-failed',
    });
  });
});

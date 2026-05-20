import { fetchCampaignByCodeFromDb, normalizeCampaignCode } from '@/services/campaign';
import { Campaign } from '@/types/campaign';
import { useCallback, useState } from 'react';
import { HttpRequester } from './httpFetch';

interface CampaignLookupState {
  campaign: Campaign | null;
  isLoading: boolean;
  error: string | null;
}

interface UseCampaignLookupResult extends CampaignLookupState {
  fetchCampaignByCode: (code: string) => Promise<Campaign | null>;
  reset: () => void;
}

const initialCampaignLookupState: CampaignLookupState = {
  campaign: null,
  isLoading: false,
  error: null,
};

const fetchCampaignByCode = async (
  code: string,
  requester?: HttpRequester
): Promise<Campaign | null> => {
  return fetchCampaignByCodeFromDb(code, requester);
};

const useCampaignLookup = (requester?: HttpRequester): UseCampaignLookupResult => {
  const [campaign, setCampaign] = useState<Campaign | null>(initialCampaignLookupState.campaign);
  const [isLoading, setIsLoading] = useState(initialCampaignLookupState.isLoading);
  const [error, setError] = useState<string | null>(initialCampaignLookupState.error);

  const reset = useCallback(() => {
    setCampaign(initialCampaignLookupState.campaign);
    setIsLoading(initialCampaignLookupState.isLoading);
    setError(initialCampaignLookupState.error);
  }, []);

  const runLookup = useCallback(
    async (code: string): Promise<Campaign | null> => {
      const normalizedCode = normalizeCampaignCode(code);

      if (!normalizedCode) {
        setCampaign(null);
        setError('campaign-code-empty');
        setIsLoading(false);
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchCampaignByCodeFromDb(normalizedCode, requester);
        setCampaign(data);
        return data;
      } catch {
        setCampaign(null);
        setError('campaign-load-failed');
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [requester]
  );

  return {
    campaign,
    isLoading,
    error,
    fetchCampaignByCode: runLookup,
    reset,
  };
};

export {
  fetchCampaignByCode,
  initialCampaignLookupState,
  useCampaignLookup
};


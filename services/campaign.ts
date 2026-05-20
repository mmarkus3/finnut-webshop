import { getJson, HttpRequester } from '@/hooks/httpFetch';
import { Campaign } from '@/types/campaign';

const normalizeCampaignCode = (code: string): string => code.trim();

const fetchCampaignByCodeFromDb = async (
  code: string,
  requester?: HttpRequester
): Promise<Campaign | null> => {
  const normalizedCode = normalizeCampaignCode(code);
  if (!normalizedCode) {
    return null;
  }

  const data = await getJson<Campaign>(
    process.env.EXPO_PUBLIC_FIREBASE_API!,
    {
      url: `/campaigns/company/${process.env.EXPO_PUBLIC_COMPANY!}/campaign/${encodeURIComponent(normalizedCode)}`,
    },
    requester
  );

  return data ?? null;
};

export { fetchCampaignByCodeFromDb, normalizeCampaignCode };

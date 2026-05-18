import { InformationPage } from '@/components/information/InformationPage';
import { AppPageWithInfoLink } from '@/components/layout/AppPageWithInfoLink';

export default function InformationScreen() {
  return (
    <AppPageWithInfoLink>
      <InformationPage />
    </AppPageWithInfoLink>
  );
}

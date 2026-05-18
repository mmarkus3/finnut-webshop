import { GlobalBottomInfoLink } from '@/components/layout/GlobalBottomInfoLink';
import { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';

interface AppPageWithInfoLinkProps {
  children: ReactNode;
}

export function AppPageWithInfoLink({ children }: AppPageWithInfoLinkProps) {
  return (
    <ScrollView className="flex-1 bg-white">
      <View>{children}</View>
      <GlobalBottomInfoLink />
    </ScrollView>
  );
}

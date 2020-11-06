import React from 'react';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';

import { FlexContainer } from '../../components/FlexContainer';
import { Spinner } from '../../components/Spinner';

import { ScreenComponentProps } from '../../types/Coordinator.d';

import { ProfileScreenStore } from './ProfileScreenStore';

import { useStore } from '../../utils/hooks';

export const ProfileScreen: React.FC<ScreenComponentProps> = observer(() => {
  const store = useStore(ProfileScreenStore);

  React.useEffect(() => {
    store.getProfileDetail();
  }, []);

  return <FlexContainer align="center">{store.isLoading ? <Spinner size="large" /> : <View />}</FlexContainer>;
});

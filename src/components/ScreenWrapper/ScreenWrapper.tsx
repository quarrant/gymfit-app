import React, { PropsWithChildren } from 'react';

import { FlexContainer } from '../FlexContainer';
import { CoordinatorInterface, ScreenComponentProps } from '../../types/Coordinator.d';

export const ScreenWrapper = (
  Screen: React.ComponentClass<ScreenComponentProps>,
  coordinator: CoordinatorInterface,
) => (props: PropsWithChildren<ScreenComponentProps>) => (
  <FlexContainer>
    <Screen {...props} coordinator={coordinator} />
  </FlexContainer>
);

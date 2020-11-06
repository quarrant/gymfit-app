import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import { getObjectEntries } from '../../utils/helpers';

type Alignments =
  | 'topStart'
  | 'topCenter'
  | 'topEnd'
  | 'centerStart'
  | 'center'
  | 'centerEnd'
  | 'bottomStart'
  | 'bottomCenter'
  | 'bottomEnd';

type Props = {
  align?: Alignments;
  backgroundColor?: string;
  useSafeAreaView?: boolean;
  unflexible?: boolean;
};

export const FlexContainer: React.FC<Props> = React.memo(
  ({ children, align, backgroundColor, useSafeAreaView, unflexible }) => {
    const ViewComponent = useSafeAreaView ? SafeAreaView : View;

    const containerStyles = getObjectEntries(styles, {
      container: true,
      [align!]: true,
      unflexible: !!unflexible,
    });

    return <ViewComponent style={[containerStyles, { backgroundColor }]}>{children}</ViewComponent>;
  },
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  topStart: { alignItems: 'flex-start', justifyContent: 'flex-start' },
  topCenter: { alignItems: 'center', justifyContent: 'flex-start' },
  topEnd: { alignItems: 'flex-end', justifyContent: 'flex-start' },
  centerStart: { alignItems: 'flex-start', justifyContent: 'center' },
  center: { alignItems: 'center', justifyContent: 'center' },
  centerEnd: { alignItems: 'flex-end', justifyContent: 'center' },
  bottomStart: { alignItems: 'flex-start', justifyContent: 'flex-end' },
  bottomCenter: { alignItems: 'center', justifyContent: 'flex-end' },
  bottomEnd: { alignItems: 'flex-end', justifyContent: 'flex-end' },
  unflexible: { flex: undefined },
});

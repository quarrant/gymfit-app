import React from 'react';
import { Animated } from 'react-native';

enum Sizes {
  'small' = 16,
  'regular' = 24,
  'medium' = 32,
  'large' = 44,
}

type Props = {
  size: keyof typeof Sizes;
};

export const Spinner: React.FC<Props> = React.memo(({ size }) => {
  const rotation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ).start();
  });

  const styles = {
    height: Sizes[size],
    width: Sizes[size],
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  return <Animated.Image style={styles} source={{ uri: `spinner_${size}` }} />;
});

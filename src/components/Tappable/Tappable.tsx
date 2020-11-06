import React from 'react';
import { Animated, TouchableOpacity, TouchableOpacityProps, GestureResponderEvent, StyleSheet } from 'react-native';

type Props = TouchableOpacityProps & {
  /**
   * Sets to use compression instead of transparency
   */
  squeeze?: boolean;
  /**
   * Sets call `onPress` debounce
   */
  debounce?: number;
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const Tappable: React.FC<Props> = React.memo(
  ({ children, onPress, onPressIn, onPressOut, squeeze, debounce, ...props }) => {
    const squeezing = React.useRef(new Animated.Value(0)).current;

    let debouncer = setTimeout(() => {});

    const onPressHandler = () => {
      clearTimeout(debouncer);
      debouncer = setTimeout(onPress, debounce);
    };

    const onPressInHandler = (event: GestureResponderEvent) => {
      Animated.timing(squeezing, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && onPressIn) {
          onPressIn(event);
        }
      });
    };

    const onPressOutHandler = (event: GestureResponderEvent) => {
      Animated.timing(squeezing, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && onPressOut) {
          onPressOut(event);
        }
      });
    };

    const activeOpacity = squeeze ? 1 : 0.8;
    const squeezingStyles = {
      transform: [
        {
          scale: squeezing.interpolate({
            inputRange: [0, 1],
            outputRange: [1, squeeze ? 0.95 : 1],
          }),
        },
      ],
    };

    return (
      <AnimatedTouchableOpacity
        {...props}
        style={[StyleSheet.flatten(props.style), squeezingStyles]}
        onPress={onPressHandler}
        onPressIn={onPressInHandler}
        onPressOut={onPressOutHandler}
        activeOpacity={activeOpacity}
      >
        {children}
      </AnimatedTouchableOpacity>
    );
  },
);

Tappable.defaultProps = {
  onPress: () => {},
};

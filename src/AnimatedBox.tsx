import {FC, memo, useEffect, useMemo} from 'react';
import {Animated, StyleSheet, useAnimatedValue} from 'react-native';

interface ReanimatedBoxProps {
  open: boolean;
}

const styles = StyleSheet.create({
  element: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});

export const AnimatedBox: FC<ReanimatedBoxProps> = memo(({open}) => {
  const animatedValue = useAnimatedValue(0);

  const animatedStyle = useMemo(() => {
    return {
      opacity: animatedValue,
      transform: [
        {
          translateX: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 100],
          }),
        },
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 50],
          }),
        },
        {scale: animatedValue},
      ],
    };
  }, [animatedValue]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      duration: 1000,
      useNativeDriver: true,
      toValue: open ? 1 : 0,
    }).start();
  }, [open, animatedValue]);

  return <Animated.View style={[styles.element, animatedStyle]} />;
});

import {FC, memo, useEffect} from 'react';
import Reanimated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';

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

export const ReanimatedBox: FC<ReanimatedBoxProps> = memo(({open}) => {
  const sharedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: sharedValue.value,
      transform: [
        {translateX: interpolate(sharedValue.value, [0, 1], [0, 100])},
        {translateY: interpolate(sharedValue.value, [0, 1], [0, 50])},
        {scale: sharedValue.value},
      ],
    };
  }, []);

  useEffect(() => {
    sharedValue.value = withTiming(open ? 1 : 0, {
      duration: 1000,
    });
  }, [open, sharedValue]);

  return <Reanimated.View style={[styles.element, animatedStyle]} />;
});

import {FC, memo, useCallback, useState} from 'react';
import {Button, StyleSheet} from 'react-native';
import {NUMBER_OF_BOXES, REANIMATED} from './config.ts';
import {ReanimatedBox} from './ReanimatedBox.tsx';
import {AnimatedBox} from './AnimatedBox.tsx';

const styles = StyleSheet.create({
  element: {
    flex: 1,
  },
});

export const App: FC = memo(() => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = useCallback(() => setOpen(x => !x), []);

  return (
    <>
      <Button title="toggle" testID="toggle-button" onPress={toggleOpen} />
      {Array.from({length: NUMBER_OF_BOXES}).map((_, index) =>
        REANIMATED ? (
          <ReanimatedBox key={index} open={open} />
        ) : (
          <AnimatedBox key={index} open={open} />
        ),
      )}
    </>
  );
});

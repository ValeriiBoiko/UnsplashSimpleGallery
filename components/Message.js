import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { wp } from '../utils';

function Message(props) {
  const { colors } = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.message}>{props.message}</Text>
    </View>
  )
}

const getStyles = (colors) => StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    width: '80%',
    fontWeight: '600',
    fontSize: wp(20),
    textAlign: 'center',
    color: colors.text,
    opacity: .8,
    lineHeight: wp(28)
  }
})

export default Message;
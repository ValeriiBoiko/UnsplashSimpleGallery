import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import { wp } from '../utils';

function PhotoCard({ url, author, style, title, ...props }) {
  const { colors } = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <Pressable {...props} style={[styles.card, style]}>
      <Image source={{ uri: url }} style={styles.image} />
      <View style={styles.caption}>
        {
          title && <Text numberOfLines={1} style={styles.title}>{title}</Text>
        }
        <Text numberOfLines={1} style={styles.author}>{author}</Text>
      </View>
    </ Pressable >
  )
}

const getStyles = (colors) => StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: wp(8),
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: wp(225),
    resizeMode: 'cover',
  },
  caption: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: wp(8),
    backgroundColor: colors.card,
    justifyContent: 'center',
    height: wp(50),
  },
  title: {
    paddingBottom: wp(4),
    fontWeight: '600',
    fontSize: wp(14),
    lineHeight: wp(16)
  },
  author: {
    opacity: .5,
    fontSize: wp(14),
    lineHeight: wp(16)
  }
})

PhotoCard.propTypes = {
  url: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default React.memo(PhotoCard, (prev, next) => prev.id === next.id);
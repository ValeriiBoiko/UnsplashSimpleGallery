import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

function Photo(props) {
  const params = props.route.params || {};

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: params.thumbUrl }} style={styles.image} />
      <Image source={{ uri: params.imageUrl }} style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    resizeMode: 'contain',
    flex: 1,
  }
})

export default Photo;
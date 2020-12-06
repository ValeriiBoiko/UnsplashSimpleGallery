import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PhotoCard from '../components/PhotoCard';
import { wp } from '../utils';
import { setImages } from '../actions';
import { State } from '../constants';
import Message from '../components/Message';

function Gallery({ images, imagesPerPage, ...props }) {
  const dimensions = Dimensions.get('window');
  const galleryItemWidth = dimensions.width / 2;

  const loadImages = () => {
    const page = images.length ? Math.floor(images.length - 1 / imagesPerPage) : 1;
    props.setImages({
      page: page,
      per_page: imagesPerPage
    }, {
      thumbSize: {
        w: galleryItemWidth,
        h: wp(225)
      },
      imageSize: {
        w: dimensions.width,
        h: dimensions.height
      },
    })
  }

  useEffect(() => {
    loadImages();
  }, [])

  if (images.length % 2 !== 0) {
    images = images.concat([{ isPlaceholder: true }]);
  }

  const renderImage = ({ item }) => (
    item.isPlaceholder ? (
      <View style={styles.photoCard} />
    ) : (
        <PhotoCard
          onPress={() => {
            props.navigation.navigate('Photo', {
              imageUrl: item.url,
              thumbUrl: item.thumbUrl,
            })
          }}
          key={item.id}
          style={styles.photoCard}
          {...item}
          url={item.thumbUrl}
        />
      )
  );

  return (
    <FlatList
      contentContainerStyle={{ minHeight: '100%' }}
      numColumns={2}
      data={images}
      renderItem={renderImage}
      onEndReachedThreshold={.7}
      onEndReached={loadImages}
      ListEmptyComponent={(
        props.requestState === State.FAILED ? (
          <Message message={'Network failed. Resource in not available'} />
        ) : (
            <Message message={'Loading...'} />
          )
      )}
    />
  )
}

const styles = StyleSheet.create({
  photoCard: {
    flex: 1,
    margin: wp(4),
  }
})

const mapStateToProps = (state) => ({
  requestState: state.gallery.state,
  images: state.gallery.images,
  imagesPerPage: state.imagesPerPage,
});

const mapDispatchToProps = (dispatch) => ({
  setImages: (queryConfig, imageConfig) => dispatch(setImages(queryConfig, imageConfig)),
})

Gallery.propTypes = {
  requestState: PropTypes.oneOf([State.FAILED, State.IN_PROGRESS, State.SUCCESS]),
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      author: PropTypes.string,
      title: PropTypes.string,
      isPlaceholder: PropTypes.bool
    })
  ).isRequired,
  imagesPerPage: PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
import { Action, State } from './constants';
import { getImageList } from './utils';

function setImagesAction(images, state) {
  return {
    type: Action.SET_IMAGES,
    payload: {
      state: state,
      images: images
    }
  }
}

export function setImages(config, imageConfig) {
  return (dispatch, getState) => {
    const currentImages = getState().gallery.images;
    dispatch(setImagesAction(currentImages, State.IN_PROGRESS))

    getImageList(config, imageConfig)
      .then(images => {
        const result = currentImages.concat(images);
        dispatch(setImagesAction(result, State.SUCCESS))
      })
      .catch(() => {
        dispatch(setImagesAction(currentImages, State.FAILED))
      })
  }
}
import { Dimensions, PixelRatio } from 'react-native';

const photosUrl = 'https://api.unsplash.com/photos/?client_id=cf49c08b444ff4cb9e4d126b7e9f7513ba1ee58de7906e4360afc1a33d1bf4c0';
const dimensions = Dimensions.get('window');
const basicWidth = 375;

const withRatio = dimensions.width / basicWidth;

function widthDependedPixel(pixel) {
  return withRatio * pixel;
}

function objectToUrlParams(config) {
  let params = '';

  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      params += `&${key}=${config[key]}`
    }
  }

  return params;
}

async function getImageList(queryConfig, imageConfig) {
  const queryParams = objectToUrlParams(queryConfig);
  const thumbUrlParams = `&fm=jpg&q=80&dpr=${PixelRatio.get()}&w=${imageConfig.thumbSize.w}&h=${imageConfig.thumbSize.h}`;
  const imageUrlParams = `&fm=jpg&q=80&dpr=${PixelRatio.get()}&w=${imageConfig.imageSize.w}&h=${imageConfig.imageSize.h}`;

  const result = await fetch(photosUrl + '&' + queryParams)
    .then(response => response.json())
    .then(data => {
      return data.map((image) => ({
        id: image.id,
        author: image.user.name,
        title: image.description,
        url: image.urls.raw + imageUrlParams,
        thumbUrl: image.urls.raw + thumbUrlParams,
      }))
    })
    .catch(err => { throw err })

  return result;
}

export {
  widthDependedPixel as wp,
  getImageList
}

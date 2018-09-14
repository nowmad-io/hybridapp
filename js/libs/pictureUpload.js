import { call, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import Upload from 'react-native-background-upload';
import Config from 'react-native-config';

const uploadPicture = (uri, success, error) => Upload.getFileInfo(uri)
  .then((metadata) => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': metadata.mimeType,
        Authorization: `Token ${Config.IMAGE_UPLOAD_TOKEN}`,
      },
      notification: { enabled: false },
      path: uri,
      url: Config.IMAGE_UPLOAD_URL,
      type: 'raw',
    };

    return Upload.startUpload(options)
      .then(uploadId => Upload.addListener(
        'completed',
        uploadId,
        ({ responseBody: body, responseCode: status }) => {
          if (status < 400) {
            return success(body);
          }
          return error({ status, body });
        },
      ))
      .catch(error);
  });

export default function* PictureUpload(path) {
  const channel = yield call(() => eventChannel((emit) => {
    uploadPicture(
      path,
      uri => emit({ uri }),
      error => emit({ error }),
    );
    return () => {};
  }));

  const { uri, error } = yield take(channel);

  return { uri, error };
}

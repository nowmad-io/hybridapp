import Upload from 'react-native-background-upload';
import Config from 'react-native-config';

const PictureUpload = (uri, success, error) => Upload.getFileInfo(uri)
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

export default PictureUpload;

import  {StyleSheet } from 'react-native';

import { colors } from '../../parameters';

export const headerStyles = {
  infoWrapper: {
    paddingTop: 8,
    paddingRight: 8,
    paddingLeft: 12,
    paddingBottom: 8,
  },
  thumbnail: {
    alignSelf: 'flex-start'
  },
  address: {
    paddingTop: 4,
    fontSize: 12,
    color: colors.grey,
  },
  addressIcon: {
    fontSize: 10,
    color: colors.grey
  },
  thumbnailFriends: (index) => ({
    position: 'absolute',
    top: 0,
    right: index * 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.white,
    zIndex: 100 - index
  }),
}

export const showcaseStyles = {
  picturesWrapper: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  mainPicture: (showcase = false) => ({
    height: 102,
    width: '100%',
    flex: 1,
    marginRight: showcase ? 1 : 0
  }),
  pictures: (length = 1, first = true) => ({
    width: '100%',
    height: '100%',
    flex: 1,
    marginLeft: length > 1 ? 1 : 0,
    marginBottom: length > 2 && first ? 1 : 0,
    marginTop: length > 2 && !first ? 1 : 0,
  }),
  tagsWrapper: {
    position: 'absolute',
    bottom: 8,
    left: 16,
    right: 16,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  tag: {
    marginRight: 8,
  },
  wrapperRight: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
}

export const reviewStyle = {
  reviewWrapper: {
    borderBottomWidth: 1,
    borderColor: colors.grey
  },
  caption: {
    position: 'absolute',
    top: 8,
    left: 8,
    color: colors.white,
    fontSize: 14
  },
  wishList: {
    flex: 1,
    alignItems: 'flex-end',
  },
  wishListIcon: {
    flex: 1,
    fontSize: 24,
    color: colors.grey,
  }
}

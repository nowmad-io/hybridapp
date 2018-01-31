import React, { StyleSheet } from 'react-native';

import { colors, sizes } from '../../../parameters';

export default {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  profileWrapper: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1
  },
  title: {
    fontSize: 24
  },
  subtitle: {
    fontSize: 14,
    color: colors.grey
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  contentWrapper: {
    flex: 1,
    width: '100%'
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  label: {
    fontSize: 12,
    color: colors.greyDark,
    paddingHorizontal: 8,
    paddingBottom: 8
  },
  listItemWrapper: {
    marginLeft: 0,
    marginBottom: 24,
    borderTopWidth: 0.5,
    borderBottomWidth: 0,
    borderColor: colors.greyDark,
    backgroundColor: colors.greyTransparent
  },
  listItem: (last) => ({
    marginRight: 16,
    marginLeft: 16,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: last ? 0 : 0.5,
    borderColor: colors.grey,
    backgroundColor: colors.transparent,
    height: 42
  }),
  itemText: {
    fontSize: 16
  },
  userPicture: {
    alignSelf: 'center',
    width: 22,
    height: 22,
    borderRadius: 50,
  },
  empty: {
    color: colors.grey
  },
  acceptButton: {
    marginLeft: 8,
    padding: 5,
    backgroundColor: colors.blueDark,
    borderRadius: 2
  },
  acceptLabel: {
    fontSize: 12,
    color: colors.white
  },
  actionsWrapper: {
    width: '100%',
    paddingVertical: 4,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: colors.blueDark,
  },
  logoutButton: {
    alignSelf: 'flex-end',
  },
  actionIcon: {
    marginRight: 0,
    color: colors.blueDark
  },
  actionLabel: {
    color: colors.blueDark,
    fontSize: 12,
    paddingRight: 4
  }
};

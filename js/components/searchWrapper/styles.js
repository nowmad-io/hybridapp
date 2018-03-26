import { colors, sizes } from '../../parameters';

export default {
  headerInput: {
    flex: 1,
  },
  headerButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  menuIcon: {
    alignSelf: 'flex-end',
  },
  searchInput: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    fontSize: 16,
    lineHeight: 16,
    color: colors.white,
  },
  searchWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  resultList: {
    position: 'absolute',
    top: sizes.toolbarHeight,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 9,
  },
};

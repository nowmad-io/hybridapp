import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated } from 'react-native';
import shortid from 'shortid';
import _ from 'lodash';

import { categoriesList } from '../../lists';

import Text from './text';
import Tag from './tag';

import { colors, sizes } from '../../parameters';

export default class Filters extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    onFiltersChange: PropTypes.func,
    visible: PropTypes.bool,
  };

  static defaultProps = {
    onFiltersChange: () => true,
  }

  constructor(props) {
    super(props);
    this.state = {
      panY: new Animated.Value(sizes.filters),
      categories: [],
    };
  }

  componentWillReceiveProps({ visible }) {
    if (visible !== this.props.visible) {
      Animated.timing(this.state.panY, {
        duration: 200,
        toValue: visible ? 0 : sizes.filters,
      }).start();
    }
  }

  toggleCategorie(categorie) {
    const { categories } = this.state;
    let newCategories = [...categories];
    const selected = _.indexOf(categories, categorie) !== -1;

    if (selected) {
      newCategories = _.without(newCategories, categorie);
    } else {
      newCategories.push(categorie);
    }

    this.setState({ categories: newCategories });
    this.props.onFiltersChange({ categories: newCategories });
  }

  render() {
    const { children, style } = this.props;
    const { panY, categories } = this.state;

    return (
      <View style={[styles.wrapper, style]} pointerEvents="box-none">
        { children }
        <Animated.View
          style={[
            styles.filters,
            { transform: [{ translateY: panY }] },
          ]}
        >
          <Text>
            Choose the filters that better describe the experience you are looking for !
          </Text>
          <View style={styles.tagWrapper}>
            {categoriesList.map(categorie => (
              <Tag
                key={shortid.generate()}
                text={categorie}
                selected={_.indexOf(categories, categorie) !== -1}
                onPress={() => this.toggleCategorie(categorie)}
                style={styles.tags}
              />
            ))}
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: sizes.filters,
    zIndex: 1,
  },
  filters: {
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingTop: 30,
    paddingBottom: 16,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  tagWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tags: {
    marginRight: 10,
  },
});

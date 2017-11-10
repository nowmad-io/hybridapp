import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Container } from 'native-base';

import ListCluster from './listCluster';
import ListItem from './listItem';

import styles from './styles';

class ResultList extends Component {
  static defaultProps = {
    style: {}
  }

  static propTypes = {
    style: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { style, nearbyPlaces } = this.props;

    return (
      <View style={[styles.resultWrapper, style]}>
        <ListCluster label="MAYBE YOU WERE LOOKING FOR">
          {nearbyPlaces.map((result, index) => (
            <ListItem
              key={index}
              image='google'
              text={result.name} />
          ))}
        </ListCluster>
      </View>
    )
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  nearbyPlaces: state.search.nearbyPlaces
});

export default connect(mapStateToProps, bindActions)(ResultList);

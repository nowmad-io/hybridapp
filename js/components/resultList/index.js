import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Container, Button } from 'native-base';

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
    const { style, nearbyPlaces, onPlaceSelected } = this.props;

    return (
      <View style={[styles.resultWrapper, style]}>
        <ListCluster label="MAYBE YOU WERE LOOKING FOR">
          <View>
            {nearbyPlaces.map((result, index) => (
              <ListItem
                key={index}
                image='google'
                text={result.name}
                onPress={onPlaceSelected} />
            ))}
            <Button style={styles.button}>
              <Text>Add a new place</Text>
            </Button>
          </View>
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

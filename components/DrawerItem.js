import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';
import {
  PRIMARY_FONT
} from '../constants';
import { OpenUrl } from '../helpers';

export default class DrawerItem extends Component {
  constructor(props) {
    super(props);
    this.state = { pressStatus: false };
  }
  _onHideUnderlay(){
    this.setState({ pressStatus: false });
  }
  _onShowUnderlay(){
    this.setState({ pressStatus: true });
  }
  style(){
    const { pressStatus } = this.state;
    if(pressStatus){
      return [styles.container, {backgroundColor: 'transparent'}];
    }else{
      return styles.container;
    }
  }
  textStyle(){
    const { pressStatus } = this.state;
    if(pressStatus){
      return [styles.text, {color: 'black'}];
    }else{
      return styles.text;
    }
  }
  render() {
    const { url, label } = this.props;
    return (
      <TouchableHighlight
        style={this.style()}
        onPress={() => OpenUrl(url)}
        onHideUnderlay={this._onHideUnderlay.bind(this)}
        onShowUnderlay={this._onShowUnderlay.bind(this)}
      >
        <Text style={this.textStyle()}>{label}</Text>
      </TouchableHighlight>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15
  },

  text: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: PRIMARY_FONT
  }
});


import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';
import { OpenUrl } from '../helpers';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    const { style } = this.props;
    if(pressStatus){
      return [styles.container, style, {backgroundColor: 'transparent'}];
    }else{
      return [styles.container, style];
    }
  }
  iconColor(){
    const { pressStatus } = this.state;
    if(pressStatus){
      return 'black';
    }else{
      return '#fff';
    }
  }
  render() {
    const { url, name } = this.props;
    return (
      <TouchableHighlight
        style={this.style()}
        onPress={() => OpenUrl(url)}
        onHideUnderlay={this._onHideUnderlay.bind(this)}
        onShowUnderlay={this._onShowUnderlay.bind(this)}
      >
        <Icon name={name} size={25} color={this.iconColor()}/>
      </TouchableHighlight>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

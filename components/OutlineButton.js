import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

const MAD_FORM_COLOR='#e3211a';

export default class OutlineButton extends Component {
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

  buttonStyle(){
    const { pressStatus } = this.state;
    const { style, pressStyle, color} = this.props;
    if(pressStatus){
      return [styles.outline, {borderColor:  color}, style, pressStyle]
    }else{
      return [styles.outline, {borderColor:  color}, style]
    }
  }

  textStyle(){
    const { pressStatus } = this.state;
    const { textStyle, textPressStyle, color} = this.props;
    if(pressStatus){
      return [styles.text, {color:  color}, textStyle, textPressStyle]
    }else{
      return [styles.text, {color:  color}, textStyle]
    }
  }

  render(){
    const { color, onPress, title } = this.props;

    return <TouchableHighlight
      style={ this.buttonStyle() }
      onPress={onPress}
      onHideUnderlay={this._onHideUnderlay.bind(this)}
      onShowUnderlay={this._onShowUnderlay.bind(this)}>
      <Text style={this.textStyle()}>{title}</Text>
    </TouchableHighlight>
  }
}


const styles = StyleSheet.create({
  outline: {
    borderWidth: 2
  },
  text: {
    textAlign: 'center',
    fontSize: 14
  }
})

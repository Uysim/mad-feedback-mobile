import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Text,
  View,
  Dimensions
} from 'react-native';
import {
  MAD_FORM_COLOR,
  PRIMARY_FONT,
  SIDEBAR_LINKS,
  INSTAGRAM_URL,
  FACEBOOK_URL
} from '../constants';
import { OpenUrl } from '../helpers';
import Icon from 'react-native-vector-icons/FontAwesome';
import DrawerItem from './DrawerItem';
import DrawerSocail from './DrawerSocail';

const deviceWidth = Dimensions.get('window').width

class DrawerContent extends Component {
  render() {
    return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Mäd</Text>
          {
            SIDEBAR_LINKS.map((link, index)=>(
              <DrawerItem key={index} {...link} />
            ))
          }
          <View style={styles.socialsWrapper}>
            <DrawerSocail
              name='facebook'
              url={FACEBOOK_URL}
              style={styles.social}
            />
            <DrawerSocail
              name='instagram'
              url={INSTAGRAM_URL}
              style={styles.social}
            />
          </View>
        </ScrollView>
    );
  }
}

export default DrawerContent;

const drawerWidth = deviceWidth / 1.38;

const styles = StyleSheet.create({
  container: {
    backgroundColor: MAD_FORM_COLOR,
    paddingTop: 15,
    paddingBottom: 15
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: PRIMARY_FONT,
    textAlign: 'center',
    color: '#fff'
  },
  item: {
    paddingTop: 15,
    paddingBottom: 15
  },
  itemText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: PRIMARY_FONT
  },
  socialsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  social: {
    width: drawerWidth/2
  },
});

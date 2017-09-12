import React, { Component } from 'react';
import {
  Button,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text
} from 'react-native';


import { MAD_FORM_COLOR, PRIMARY_FONT } from '../constants';
import { OpenUrl } from '../helpers';
import OutlineButton from '../components/OutlineButton';
import SplashScreen from 'react-native-splash-screen';

const width = Dimensions.get('window').width

export default class Home extends Component {
  static navigationOptions = {
    title: 'Mäd',
    cardStyle: {
      backgroundColor: 'transparent'
    },
    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: 'Poppins'
    }
  }

  componentDidMount() {
    setTimeout(()=>{
      SplashScreen.hide();

    }, 2000)
  }

  visitHomePage(){
    const homePageUrl = 'http://mäd.com'
    OpenUrl(homePageUrl);
  }

  render() {
    return <Image
        source={require('../assets/images/home-page-background.jpg')}
        style={styles.container}>
      <View style={styles.overlay}/>
      <View>
        <Text style={styles.title}>We Make It Happen.</Text>
        <View style={styles.buttonsWrapper}>
          <View style={styles.buttonWrapper}>
            <OutlineButton
              onPress={() => this.props.navigation.navigate('FormFeedBack')}
              title="Give Feedback"
              style={styles.button}
              pressStyle={styles.buttonPress}
              textStyle={styles.buttonText}
              color='#fff'
            />
          </View>
          <View style={styles.buttonWrapper}>
            <OutlineButton
              onPress={() => this.visitHomePage() }
              title="Visit Us"
              style={styles.button}
              pressStyle={styles.buttonPress}
              textStyle={styles.buttonText}
              color='#fff'
            />
          </View>
        </View>
      </View>
    </Image>
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.5
  },
  title: {
    fontFamily: PRIMARY_FONT,
    fontWeight: 'bold',
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  buttonWrapper: {
    padding: 5
  },
  button: {
    width: (width / 2) - 30,
    height: 70,
    borderWidth: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPress: {
    backgroundColor: MAD_FORM_COLOR,
    borderWidth: 0
  },
  buttonText: {
    fontFamily: PRIMARY_FONT,
    fontWeight: 'bold'
  }
});

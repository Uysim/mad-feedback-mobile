import React, { Component } from 'react';

import {
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StackNavigator,
  DrawerNavigator
} from 'react-navigation';

import Home from './pages/home';
import FormFeedBack from './pages/form';
import DrawerContent from './components/DrawerContent';


const headerColor = (page)=>{
  if(page == 'Home'){
    return '#fff';
  }else{
    return null;
  }
}

const navigationOptions = (page)=>(
  ({navigation}) => ({
    headerRight: (<TouchableHighlight style={{paddingLeft: 10, paddingRight: 10}} onPress={()=>navigation.navigate('DrawerOpen')}>
      <Icon name='bars' size={25} color={headerColor(page)}/>
    </TouchableHighlight>)
  })
)

const Navigator = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: navigationOptions('Home')
  },
  FormFeedBack: {
    screen: FormFeedBack,
    navigationOptions: navigationOptions('FormFeedBack')
  }
});

const MadFeedBack = DrawerNavigator({
  Navigator: {
    screen: Navigator
  },
}, {
  drawerPosition: 'right',
  contentComponent: (props) =>(<DrawerContent/>)
});


export default MadFeedBack;

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import StarRating from 'react-native-star-rating';
import { SegmentedControls, RadioButtons } from 'react-native-radio-buttons';
import { SERVER_URL, SECONDARY_FONT, PRIMARY_FONT } from '../constants'
import Spinner from 'react-native-loading-spinner-overlay';
import ResponsiveImage from 'react-native-responsive-image';
import { NavigationActions } from 'react-navigation'

const MAD_FORM_COLOR='#e3211a';

const submitters = [
  {
    label: 'I am a client',
    value: 'Client'
  },
  {
    label: 'I am an employee',
    value: 'Employee'
  }
]

const categories = [
  'Quality',
  'Speed',
  'Value',
  'Creativity',
  'Strategy'
]

export default class FormFeedBack extends Component {

  static navigationOptions = {
    title: 'Feedback Form',
  }

  constructor(props) {
    super(props);
    this.state = {
      submitter: submitters[0].value,
      rating: 0,
      category: categories[0],
      comments: '',
      status: '',
    };
  }

  setSelectedSubmitter(submitter){
    this.setState({ submitter: submitter.value })
  }

  setRating(rating){
    this.setState({ rating: rating })
  }

  setSelectedCategory(category){
    this.setState({ category: category })
  }

  setComments(comments){
    this.setState({ comments: comments })
  }

  validateForm(){
    const { submitter, rating, category, comments } = this.state;

    if(submitter==''){
      Alert.alert('Please Select Who You are');
      return false;
    }
    if(rating==0){
      Alert.alert('Please Select Rating Scores');
      return false;
    }

    if(category==''){
      Alert.alert('Please Select Feedback Category');
      return false;
    }
    return true;
  }

  submitFeedback(){
    if(!this.validateForm()){
      return;
    }
    this.setState({ status: 'submitting' })
    const { submitter, rating, category, comments } = this.state;
    const { navigation } = this.props;
    const endPoint = SERVER_URL + '/api/v1/feedbacks'
    const feedback = {
      submitter: submitter,
      rating: rating,
      category: category,
      comments: comments
    }
    fetch(endPoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ feedback: feedback })
    }).then(()=>{
      this.setState({ status: 'submited' })
      setTimeout(()=>{
        navigation.goBack();
      }, 5000)
    })
  }

  renderThankYou(){
    return (
      <View style={styles.thankContainer}>
        <ResponsiveImage initWidth="300" initHeight="150" source={require('../assets/images/logo.png')} />
        <View
          style={{
            borderColor: MAD_FORM_COLOR,
            borderWidth: 1,
            borderStyle: 'solid',
            width: 100,
            marginBottom: 15
          }}
        />
        <Text style={styles.thankYouText}>Thanks For</Text>
        <Text style={styles.thankYouText}>Your Feedback</Text>
      </View>
    )
  }

  renderForm(){
    const {
      submitter,
      rating,
      category,
      comments,
      status
    } = this.state;

    return (
      <ScrollView style={styles.formContainer}>
        <Spinner
          visible={status == 'submitting'}
          textContent={"Submitting Feedback ..."}
          textStyle={{color: '#FFF'}}
        />

        <View style={styles.inputWrapper}>
          <SegmentedControls
            options={ submitters }
            selectedOption={ submitter }
            optionContainerStyle={ styles.submitters }
            containerBorderRadius={0}
            onSelection={ this.setSelectedSubmitter.bind(this) }
            extractText={ (option) => option.label }
            testOptionEqual={(selectedValue, option) => selectedValue === option.value}

            optionStyle={{fontFamily: SECONDARY_FONT}}
            separatorTint={ MAD_FORM_COLOR }
            containerBorderTint={ MAD_FORM_COLOR }
            tint={ MAD_FORM_COLOR }
          />
        </View>
        <View style={styles.inputWrapper}>
          <StarRating
            rating={ rating }
            selectedStar={ this.setRating.bind(this) }
            starColor={ MAD_FORM_COLOR }
            emptyStarColor={ MAD_FORM_COLOR }
          />
        </View>

        <View style={styles.inputWrapper}>
          <SegmentedControls
            containerBorderRadius={0}
            direction='column'
            options={ categories }
            onSelection={ this.setSelectedCategory.bind(this) }
            selectedOption={ category }

            optionStyle={{fontFamily: SECONDARY_FONT}}
            separatorTint={ MAD_FORM_COLOR }
            containerBorderTint={ MAD_FORM_COLOR }
            tint={ MAD_FORM_COLOR }
          />
        </View>


        <View style={styles.inputWrapper}>
          <TextInput
            placeholder='Comments'
            value={ comments }
            multiline={ true }
            style={ styles.comments }
            numberOfLines={5}
            underlineColorAndroid='transparent'
            onChangeText={ this.setComments.bind(this) }
          />
        </View>
        <Text>Submit feedback may take 10 to 20 seconds because free testing server</Text>
        <View style={ styles.inputWrapper }>
          <TouchableHighlight
            style={ styles.submit }
            onPress={ this.submitFeedback.bind(this) }>
            <Text style={styles.submitText}>Submit Feedback</Text>
          </TouchableHighlight>
        </View>

      </ScrollView>
    );
  }

  render() {

    const {
      status
    } = this.state;
    if(status=='submited'){
      return this.renderThankYou();
    }else{
      return this.renderForm();
    }
  }
}

const styles = StyleSheet.create({
  thankYouText: {
    fontSize: 25,
    color: MAD_FORM_COLOR,
    fontFamily: PRIMARY_FONT,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  thankContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: undefined,
    height: undefined,
    justifyContent: 'center',
    alignItems: 'center',

  },

  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15
  },

  submitters: {
    borderRadius: 0,
  },
  comments: {
    fontFamily: SECONDARY_FONT,
    marginTop: 15,
    paddingLeft: 5,
    paddingRight: 5,
    textAlignVertical: "top",
    borderWidth: 1,
    borderStyle: 'solid',
    height: 100,
    borderColor: MAD_FORM_COLOR
  },

  inputWrapper: {
    marginTop: 10,
    marginBottom: 10,
  },
  submitText: {
    color: '#fff',
    fontFamily: SECONDARY_FONT,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submit: {
    backgroundColor: MAD_FORM_COLOR,
    paddingTop: 10,
    paddingBottom: 10,
  }
});

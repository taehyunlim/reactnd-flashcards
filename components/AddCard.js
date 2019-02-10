import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { fresh, teal, white, matte } from '../utils/colors'
import { timeToString } from '../utils/helpers'
import { connect } from "react-redux";


class AddCard extends Component {

  static navigationOptions = {
    title: 'New Card',
  };

  state = {
    qInput: '',
    aInput: '',
  }

  qHandleTextChange = (input) => {
    this.setState(() => ({
      qInput: input
    }))
  }

  aHandleTextChange = (input) => {
    this.setState(() => ({
      aInput: input
    }))
  }

  handleOnPress = () => {
    if (!(this.state.qInput.trim().length > 0) && !(this.state.aInput.trim().length > 0)) {
      return
    }
    console.log("Submitted")
    this.setState(() => ({
      qInput: '',
      aInput: '',
    }))
  }

  render() {
    const { qInput, aInput } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.header}>Add a New Card</Text>
        <TextInput style={styles.input} value={qInput} onChangeText={(input) => this.setState({ qInput: input })} />
        <TextInput style={styles.input} value={aInput} onChangeText={(input) => this.setState({ aInput: input })} />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: teal }]}
          onPress={this.handleOnPress}
        >
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 50,
  },
  input: {
    width: 300,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: matte,
    marginBottom: 25
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 35
  },
  buttonText: {
    color: white,
    fontSize: 20,
    paddingBottom: 5
  }
})

export default AddCard
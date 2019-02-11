import React, { Component } from 'react'
import { View, Text, StyleSheet, Switch, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { fresh, teal, white, matte } from '../utils/colors'
import { timeToString } from '../utils/helpers'
import { connect } from 'react-redux'
import { receiveDecks, addDeck } from '../actions'
import { submitDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'

class AddDeck extends Component {

  state = {
    input: '',
  }

  handleTextChange = (input) => {
    this.setState(() => ({
      input: input
    }))
  }

  handleOnPress = () => {
    if (!(this.state.input.trim())) {
      return
    }

    const id = 'deck_' + timeToString()
    const deck = {
      "name": this.state.input.trim(),
      "cards": []
    }

    // Redux
    this.props.dispatch(
      addDeck({
        [id]: deck
      })
    )

    // Navigates back to ListDeck
    this.props.navigation.goBack()

    // API
    submitDeck({ id, deck });

    console.log("Submitted")
    this.setState(() => ({
      input: ''
    }))
  }

  render() {
    const { testProp } = this.props
    const { input } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.header}>Add a New Deck</Text>
        <TextInput style={styles.input} value={input} onChangeText={(input) => this.setState({ input })} onSubmitEditing={this.handleOnPress} />
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
    paddingTop: 20,
    fontSize: 35,
    textAlign: 'center',
  },
  input: {
    width: 300,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: matte,
    marginTop: 50,
    marginBottom: 25
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 10
  },
  buttonText: {
    color: white,
    fontSize: 20,
    paddingBottom: 5
  }
})

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    navigation
  }
}

export default connect(mapDispatchToProps)(AddDeck)
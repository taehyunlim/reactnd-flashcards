import React, { Component } from 'react'
import { View, Text, StyleSheet, Switch, TextInput, KeyboardAvoidingView } from 'react-native'
import { fresh, teal, white, matte } from '../utils/colors'
import { timeToString } from '../utils/helpers'
import { connect } from "react-redux";

class AddDeck extends Component {

  state = {
    input: '',
    showInput: false
  }

  handleToggleSwitch = () => {
    this.setState((state) => ({
      showInput: !state.showInput,
    }))
  }

  handleTextChange = (input) => {
    this.setState(() => ({
      input
    }))
  }

  render() {

    const { input, showInput } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text>Add Deck</Text>
        <Switch value={showInput} onValueChange={this.handleToggleSwitch} />
        {showInput === true && (
          <TextInput style={styles.input} value={input} onChange={this.handleTextChange} />)}
      </KeyboardAvoidingView>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
    backgroundColor: white,
  },
  input: {
    width: 300,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: matte,
    margin: 50
  }
})

function mapStateToProps(state) {
  const id = timeToString()
  return {
    id
  }
}

export default connect(mapStateToProps)(AddDeck)
import React, { Component } from 'react'
import { View, Text, StyleSheet, Switch, TextInput } from 'react-native'
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
      <View>
        <Text>Add Deck</Text>
        <Switch value={showInput} onValueChange={this.handleToggleSwitch} />
        {showInput === true && (
          <TextInput style={styles.textInput} value={input} onChange={this.handleTextChange} />)}
      </View>
    )

  }

}

const styles = StyleSheet.create({
  textInput: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
    backgroundColor: fresh,
    color: matte
  }
})

function mapStateToProps(state) {
  const id = timeToString()
  return {
    id
  }
}

export default connect(mapStateToProps)(AddDeck)
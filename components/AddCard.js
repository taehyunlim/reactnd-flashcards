import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { fresh, teal, white, matte } from '../utils/colors'
import { timeToString } from '../utils/helpers'
import { connect } from "react-redux";
import { receiveDeck } from '../actions'
import { submitCard } from '../utils/api'


class AddCard extends Component {

  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params
    return { title: `Add a card for ${name}` }
  };

  state = {
    q: '',
    a: '',
  }

  qHandleTextChange = (input) => {
    this.setState(() => ({
      q: input
    }))
  }

  aHandleTextChange = (input) => {
    this.setState(() => ({
      a: input
    }))
  }

  handleOnPress = () => {
    if (!(this.state.q.trim().length > 0) || !(this.state.a.trim().length > 0)) {
      return
    }
    console.log("Submitted")

    const { q, a } = this.state
    let { deck, id } = this.props

    const newDeck = {
      [id]: {
        ...deck,
        cards: deck["cards"] ? deck["cards"].concat([{ q, a }]) : [{ q, a }]
      }
    }
    console.log(newDeck)

    // API 
    submitCard(id, { q, a })

    // Redux
    this.props.dispatch(
      receiveDeck(newDeck)
    )
    // Navigate back to ViewDeck 
    this.props.navigation.goBack()

    this.setState(() => ({
      q: '',
      a: '',
    }))
  }

  render() {
    const { q, a } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.header}>Add a New Card</Text>
        <TextInput style={styles.input} value={q} onChangeText={(input) => this.setState({ q: input })} />
        <TextInput style={styles.input} value={a} onChangeText={(input) => this.setState({ a: input })} />
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

function mapStateToProp(state, { navigation }) {
  const { id, name } = navigation.state.params
  return {
    id,
    name,
    deck: state[id]
  }
}

export default connect(mapStateToProp)(AddCard)
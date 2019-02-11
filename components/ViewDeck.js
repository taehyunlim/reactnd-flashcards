import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, fresh, matte, watermelon, teal } from '../utils/colors'
import { connect } from 'react-redux'
import { deleteDeck } from '../utils/api'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api'

class ViewDeck extends Component {

  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params
    return { title: `${name}` }
  };

  // TO DO: Somewhat broken - Does not fetch new dispatch
  delete = () => {
    const { id } = this.props
    // API
    deleteDeck(id, this.props.refresh)
    // Navigate back to ListDeck
    this.props.navigation.goBack()
  }

  render() {

    const { id, name, deck } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{deck.name}</Text>
          {deck.cards
            ? (<Text style={styles.subHeader}>{deck.cards.length} cards</Text>)
            : (<Text style={styles.subHeader}>Add new cards below</Text>)
          }

        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: teal }]}
            onPress={() => this.props.navigation.navigate('AddCard', { id: id, name: name })}
          >
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: teal }]}
            onPress={() => this.props.navigation.navigate('Quiz', { id: id, name: name })}
          >
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: white }]}
            onPress={this.delete}
          >
            <Text style={[styles.buttonText, { color: watermelon, fontSize: 15, paddingTop: 50 }]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 20,
    fontSize: 35,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
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

function mapStateToProp(state, { navigation }) {
  const { id, name } = navigation.state.params
  return {
    id,
    name,
    deck: state[id]
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { id } = navigation.state.params
  console.log(id)
  return {
    refresh: () => fetchDecks().then((decks) => dispatch(receiveDecks(decks))),
    goBack: () => navigation.goBack()
  }
}

export default connect(mapStateToProp, mapDispatchToProps)(ViewDeck)
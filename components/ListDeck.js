import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { white, fresh } from '../utils/colors'

class ListDeck extends Component {
  state = {
    ready: false,
    decks: [
      {
        "name": "deckA",
        "id": "abc",
        "cards": [
          { "q": "quesitonA1", "a": "answerA1" },
          { "q": "quesitonA2", "a": "answerA2" },
          { "q": "quesitonA3", "a": "answerA3" }
        ]
      },
      {
        "name": "deckB",
        "id": "abcd",
        "cards": [
          { "q": "quesitonB1", "a": "answerB1" },
          { "q": "quesitonB2", "a": "answerB2" },
          { "q": "quesitonB3", "a": "answerB3" }
        ]
      },
      {
        "name": "deckC",
        "id": "abcde",
        "cards": [
          { "q": "quesitonC1", "a": "answerC1" },
          { "q": "quesitonC2", "a": "answerC2" },
          { "q": "quesitonC3", "a": "answerC3" }
        ]
      }
    ]
  }

  componentDidMount() {
    // const { dispatch }
  }



  renderDeck = (deck) => (
    <TouchableOpacity
      style={styles.item} key={deck.id}
      onPress={() => this.props.navigation.navigate('ViewDeck', { id: deck.id })}
    >
      <Text>{deck.name}</Text>
      <Text>{deck.cards.length} cards</Text>
    </TouchableOpacity>
  )

  render() {
    const { decks, ready } = this.state

    return (
      <View>
        {decks.map(deck => {
          return this.renderDeck(deck)
        })}
      </View>
    )

  }

}

const styles = StyleSheet.create({
  item: {
    backgroundColor: fresh,
    borderRadius: 10,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})


export default ListDeck
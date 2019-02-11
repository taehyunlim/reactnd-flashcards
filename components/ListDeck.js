import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks, addDeck } from '../actions'
import { timeToString } from '../utils/helpers'
import { fetchDecks } from '../utils/api'
import { white, fresh, matte, gray } from '../utils/colors'
import { AppLoading } from 'expo'

class ListDeck extends Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    const { dispatch } = this.props

    // API
    fetchDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })))
  }

  render() {
    const { decks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={{ flex: 1 }}>
        {Object.keys(decks).map(key => {
          const { name, cards } = decks[key]
          return (
            <TouchableOpacity
              style={styles.item}
              key={key}
              onPress={() => this.props.navigation.navigate('ViewDeck', { id: key, name: name })}
            >
              <Text style={{ fontSize: 20 }}>{name}</Text>
              {cards
                ? (<Text style={{ fontSize: 16, color: gray }}>{cards.length} cards</Text>)
                : (<Text style={{ fontSize: 16, color: gray }}>Tap to add cards</Text>)
              }
            </TouchableOpacity>
          )
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
    alignItems: 'center',
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

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(ListDeck)
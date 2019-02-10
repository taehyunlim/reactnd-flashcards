import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import { connect } from 'react-redux'


class ViewDeck extends Component {
  static navigationOPtions = ({ navigation }) => {
    const { id } = navigation.state.params
    console.log(id)

    return {
      title: `Deck ID: ${id}`
    }
  }

  render() {

    return (
      <View>
        <Text>View an Individual Deck</Text>
      </View>
    )

  }

}

export default ViewDeck
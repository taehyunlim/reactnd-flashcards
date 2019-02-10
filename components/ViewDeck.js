import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, fresh, matte } from '../utils/colors'


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
        <Text>? cards</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddCard', { id: "test" })}
        >
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Quiz', { id: "test" })}
        >
          <Text>Start Quiz</Text>
        </TouchableOpacity>

      </View>
    )

  }

}

export default ViewDeck
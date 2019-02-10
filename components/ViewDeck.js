import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, fresh, matte, watermelon, teal } from '../utils/colors'


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
      <View style={styles.container}>
        <Text>View an Individual Deck</Text>
        <Text>? cards</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: teal }]}
          onPress={() => this.props.navigation.navigate('AddCard', { id: "test" })}
        >
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: watermelon }]}
          onPress={() => this.props.navigation.navigate('Quiz', { id: "test" })}
        >
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>

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
  item: {
    borderRadius: 10,
    padding: 20,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 7,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    color: white
  },
  button: {
    padding: 10,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20
  },
  buttonText: {
    color: white,
    fontSize: 20,
  }
})

export default ViewDeck
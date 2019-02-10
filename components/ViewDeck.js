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
        <View style={styles.headerContainer}>
          <Text style={styles.header}>View an Individual Deck</Text>
          <Text style={styles.subHeader}>? cards</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: teal }]}
            onPress={() => this.props.navigation.navigate('AddCard', { id: "test" })}
          >
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: teal }]}
            onPress={() => this.props.navigation.navigate('Quiz', { id: "test" })}
          >
            <Text style={styles.buttonText}>Start Quiz</Text>
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

export default ViewDeck
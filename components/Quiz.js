import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from "react-redux";
import { white, fresh, matte, watermelon, teal, gray } from '../utils/colors'

class Quiz extends Component {

  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params
    return { title: `Quiz: ${name}` }
  };

  state = {
    currentCount: 1,
    correct: 0,
    showAnswer: false
  }

  toggleAnswer = () => {
    this.setState(() => ({
      showAnswer: !this.state.showAnswer,
    }))
  }

  incrementCorrect = () => {
    this.setState(() => ({
      correct: this.state.correct + 1,
      currentCount: this.state.currentCount + 1,
      showAnswer: false
    }))
  }

  incrementCount = () => {
    this.setState(() => ({
      currentCount: this.state.currentCount + 1,
      showAnswer: false
    }))
  }

  reset = () => {
    this.setState(() => ({
      currentCount: 1,
      correct: 0,
      showAnswer: false
    }))
  }

  renderCard = (card, index) => {
    const { showAnswer } = this.state
    return (
      <View key={index} style={styles.buttonContainer}>
        {!this.state.showAnswer
          ? (<Text style={styles.header}>{card.q}</Text>)
          : (<Text style={styles.header}>{card.a}</Text>)
        }
        <TouchableOpacity
          style={[styles.button, { backgroundColor: white }]}
          onPress={this.toggleAnswer}
        >
          <Text style={[styles.buttonText, { color: watermelon, fontSize: 15, paddingBottom: 50 }]}>
            {showAnswer ? `Hide answer` : `Reveal answer`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: teal }]}
          onPress={this.incrementCorrect}
        >
          <Text style={styles.buttonText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: teal }]}
          onPress={this.incrementCount}
        >
          <Text style={styles.buttonText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { cards } = this.props.deck
    const { currentCount, correct } = this.state

    return (
      <View style={{ flex: 1 }}>
        {currentCount < cards.length + 1 &&
          (<Text style={{ padding: 10 }}>{currentCount}/{cards.length}</Text>)
        }
        {cards.map((card, index) => {
          if (index + 1 == currentCount) {
            return this.renderCard(card, index)
          }
        })}
        {currentCount == cards.length + 1 &&
          (<View style={{ flex: 1 }}>
            <Text style={[styles.subHeader]}>You answered {correct} correctly {"\n"}out of {cards.length} questions.</Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: white }]}
              onPress={this.reset}
            >
              <Text style={[styles.buttonText, { color: watermelon, fontSize: 15, paddingBottom: 50 }]}>
                Restart
              </Text>
            </TouchableOpacity>
          </View>)
        }
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
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 50,
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
  console.log(state[id].cards)
  return {
    id,
    name,
    deck: state[id]
  }
}

export default connect(mapStateToProp)(Quiz)
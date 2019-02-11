import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { matte, white, watermelon, fresh, teal } from './utils/colors'
import ListDeck from './components/ListDeck'
import AddDeck from './components/AddDeck'
import ViewDeck from './components/ViewDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from './reducers'

function CustomStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createAppContainer(createMaterialTopTabNavigator({
  Decks: {
    screen: ListDeck,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add a Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? matte : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : matte,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      },
      indicatorStyle: {
        backgroundColor: fresh
      }
    }
  }))

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  ViewDeck: {
    screen: ViewDeck,
    navigationOptions: {
      headerTintColor: matte,
      headerStyle: {
        backgroundColor: fresh
      }
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      headerTintColor: matte,
      headerStyle: {
        backgroundColor: fresh
      }
    }
  },
  ListDeck: {
    screen: ListDeck,
    navigationOptions: {
      headerTintColor: matte,
      headerStyle: {
        backgroundColor: fresh
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: matte
      }
    }
  }
}))

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={styles.container}>
          <CustomStatusBar backgroundColor={matte} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});


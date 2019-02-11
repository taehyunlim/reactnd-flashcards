import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = "MobileFlashcards:deck"

function setDummyData() {
  let dummyData = {
    "abc": {
      "name": "deckA",
      "cards":
        [{ "q": "quesitonA1", "a": "answerA1" },
        { "q": "quesitonA2", "a": "answerA2" },
        { "q": "quesitonA3", "a": "answerA3" }]
    },
    "abcd": {
      "name": "deckB",
      "cards":
        [{ "q": "quesitonB1", "a": "answerB1" },
        { "q": "quesitonB2", "a": "answerB2" },
        { "q": "quesitonB3", "a": "answerB3" }]
    },
    "abcde": {
      "name": "deckC",
      "cards":
        [{ "q": "quesitonC1", "a": "answerC1" },
        { "q": "quesitonC2", "a": "answerC2" },
        { "q": "quesitonC3", "a": "answerC3" }]
    },
    "abcdef": {
      "name": "deckD",
      "cards":
        [{ "q": "quesitonD1", "a": "answerD1" },
        { "q": "quesitonD2", "a": "answerD2" },
        { "q": "quesitonD3", "a": "answerD3" }]
    }
  }

  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))
  return dummyData
}

export function fetchDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      return (results) === null
        ? setDummyData()
        : JSON.parse(results)
    })
}

export function submitDeck({ deck, id }) {
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [id]: deck
    })
  )
}

export function deleteDeck(id, cb) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(res => {
    const data = JSON.parse(res)
    data[id] = undefined
    delete data[id]
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
      .then(() => { cb() })
  })
}

export function submitCard(id, card) {
  AsyncStorage.getItem(DECK_STORAGE_KEY).then(res => {
    const data = JSON.parse(res)
    const newData = Object.assign({}, data, {
      ...data,
      [id]: {
        ...data[id],
        cards: data[id]["cards"] ? data[id]["cards"].concat([card]) : [].concat([card])
      }
    })
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(newData))
  }).done()
}
import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Record } from 'immutable';
import cards, {cardState} from './reducers/cards.js';
import menu, {menuState} from './reducers/menu.js'
import Table from './components/Table.js'

const initState = Record({
  menu: new menuState(),
  cards: new cardState()
})

function rootReducer (state = initState(), action) {
  return state
    .update('menu', menu(action))
    .update('cards', cards(action))
}

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <Table />
    </Provider>
  )
}

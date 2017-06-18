import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Record } from 'immutable';
import cards, {cardState} from './reducers/cards.js';
import menu, {menuState} from './reducers/menu.js'
import Table from './components/Table.js'
import utilActions from './actions/util.js'

const initState = Record({
  menu: new menuState(),
  cards: new cardState()
})

function combinedReducer (state, action) {
  return state
    .update('menu', menu(action))
    .update('cards', cards(action))
}

function rootReducer (state = initState(), action) {
  if (action.type === utilActions.MULTI_ACTION) {
    return action.payload.reduce(combinedReducer, state)
  }
  return combinedReducer(state, action)
}

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <Table />
    </Provider>
  )
}

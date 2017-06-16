import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Table from './components/Table.js';
import { cardRecord } from './components/Card.js'
import { Record, Map } from 'immutable';
import { types } from './components/actionCreators.js';

const initState = Record({
  items: new Map(),
  maxHeight:0,
  maxKey:0,
  mouseX:0,
  mouseY:0
})()

function rootReducer (state = initState, action) {
  switch (action.type) {
    case types.NEW_CARD:
      return state.setIn(
        ['items', state.maxKey],
        new cardRecord(action.props).set('key', state.maxKey)
      ).update('maxKey', a=>a+1)
    case types.SELECT:
      if (state.items.get(action.key).selected) {return state}
      return state.updateIn(['items', action.key], a =>{
        return a.set('selected', true).set(
          'height',
          state.maxHeight+1
        )
      }).update(
        'maxHeight',
         a=>a+1//might eventually cause problems
       ).set('mouseX', action.x).set('mouseY', action.y)
    case types.DESELECT:
      return state.updateIn(['items', action.key], a => a.set('selected', false))
    case types.MOVE:
      return state.updateIn(
        ['items', action.key], a=> {
          return (a
            .update('x', x=>x+action.x-state.mouseX)
            .update('y', y=>y+action.y-state.mouseY)
          )
        }
      ).set('mouseX', action.x).set('mouseY', action.y)
    default:
      return state
  }
}

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <Table />
    </Provider>
  )
}

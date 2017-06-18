import {Record, Map} from 'immutable'
import { cardRecord } from '../components/Card.js'
import cardsActions from '../actions/cards.js'

export const cardState = Record({
  items: new Map(),
  maxHeight:0,
  maxKey:0,
  'mouseX':0,
  'mouseY':0
});

const cards = action => state => {//currying for composition
  switch (action.type) {
    case cardsActions.NEW_CARD:
      return state.setIn(
        ['items', state.maxKey],
        new cardRecord(action.props).set('key', state.maxKey)
      ).update('maxKey', a=>a+1)
    case cardsActions.SELECT:
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
    case cardsActions.DESELECT:
      return state.updateIn(['items', action.key], a => a.set('selected', false))
    case cardsActions.MOVE:
      return state.updateIn(
        ['items', action.key], a=> {
          return (a
            .update('x', x=>x+action.x-state.mouseX)
            .update('y', y=>y+action.y-state.mouseY)
          )
        }
      ).set('mouseX', action.x).set('mouseY', action.y)
    case cardsActions.DELETE_CARD:
      return state.deleteIn(['items', action.payload.key])
    default:
      return state
  }
}

export default cards;

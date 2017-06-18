import {Record, Map} from 'immutable';
import menuActions from '../actions/menu.js';
import {newCard, deleteCard} from '../actions/cards.js';
import {random} from 'lodash/fp'


export const menuState = Record({
  visible:false,
  x:0,
  y:0,
  items: new Map(),
  targetKey:null
})



/*
Menu items for various targets should be immutable maps.
Keys should be the text that appears in the menu.
Values should be the function that will be fired on click.
these functions should destructure a single params object to keep the api standard.
*/
const targetTypes = Record({
  Table:new Map({
    'Add Random Card': ({x, y})=> {
      return newCard({
        suit: random(1,4),
        rank: random(1, 13),
        x,
        y
      })
    }
  }),
  Card:new Map({
    'Remove Card': ({targetKey:key})=> {
      return deleteCard(key)
    }
  })
})()//self initializing

const menu = action => state => {
  switch (action.type) {
    case menuActions.OPEN_MENU:
      return new menuState({
        visible:true,
        x: action.payload.x,
        y: action.payload.y,
        items: targetTypes[action.payload.type],
        targetKey: action.payload.key
      })
    case menuActions.CLOSE_MENU:
      return state.set('visible', false)
    default:
       return state;
  }
};

export default menu;

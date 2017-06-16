import React from 'react';
import { connect } from 'react-redux';
import { newCard } from './actionCreators.js';
import { bindActionCreators } from 'redux';
import { Card } from './Card.js';
import _ from 'lodash/fp'

const svgStyle = {
  width:'100vw',
  height:'100vh'
};

function mapStateToProps (state) {
  return {items:state.items}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ newCard }, dispatch)
}

function randomCard (x, y) {
  return {
    x: x,
    y: y,
    suit: _.random(1, 4),
    rank: _.random(1, 13)
  }
}

function Table({items, newCard}) {
  return (
    <svg style={svgStyle} onContextMenu={
      (evt)=> {
        evt.preventDefault()
        newCard(randomCard(evt.screenX, evt.screenY))
      }
    }>
      {items.valueSeq()
        .sort((a,b)=> a.height-b.height)
        .map(a => <Card record={a} key={a.key} />)/*TODO replace Card with polymorphic Item for deck support*/}
    </svg>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash/fp';
import {Record} from 'immutable';
import { selectCard, deselectCard, moveCard } from './actionCreators.js';


const backgroundStyle = (selected)=>{
  return {
    fill: 'white',
    stroke:'black',
    strokeWidth:1
  }
}

const Suit = (()=> {
  const suits = ['Joker', 'Diamonds', 'Clubs', 'Hearts', 'Spades']
  return ({type, x, y}) => {
    return <text x={x} y={y}>{suits[type]}</text>
  }
})()

const Rank = (()=> {
  const ranks = {0:'', 1:'Ace', 11: 'Jack', 12: 'Queen', 13:'King'}//0 for joker
  return ({rank, x, y})=> {
    const realRank = ranks[rank] || rank
    const realX = ranks[rank] ? x-10 : x
    return <text x={realX} y={y}>{realRank}</text>
  }
})()

export const cardRecord = Record({
  rotate:0,
  x:0,
  y:0,
  scale:100,
  suit:0,
  rank:0,
  height:0,
  faceup:true,
  selected:false,
  key:undefined
})

function mapDispatchToProps (dispatch) {
  return bindActionCreators({selectCard, deselectCard, moveCard}, dispatch)
}

function unboundCard ({
  record:{rotate, x, y, scale, suit, rank, selected, key},
  selectCard,
  deselectCard,
  moveCard
}) {
  return (
    <g className="card"
      onMouseDown={({screenX:x, screenY:y})=>selectCard(key, x, y)}
      onMouseUp={()=>deselectCard(key)}
      onMouseLeave={()=>deselectCard(key)}
      onMouseMove={({screenX:x, screenY:y})=> {
        if (selected) {moveCard(key, x, y)}
      }}
      transform={'rotate('+(rotate)+
        ') translate('+x+' '+y+
        ') scale('+(scale/100)+')'}
    >
      <rect
        width="100"
        height="160"
        rx="2"
        ry="2"
        style={backgroundStyle(selected)}
        ></rect>
      <Suit type={suit} x="20" y="80"/>
      <Rank x="10" y="15" rank={rank}/>
      <Rank x="80" y="155" rank={rank}/>
    </g>
  )
}

export const Card = connect(null, mapDispatchToProps)(unboundCard)

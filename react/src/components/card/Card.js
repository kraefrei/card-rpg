import React, {Component} from 'react';
import _ from 'lodash/fp'

const backgroundStyle = {
  fill:'white',
  stroke:'black',
  strokeWidth:1
}

const Suit = (()=> {
  const suits = ['Joker', 'Diamonds', 'Clubs', 'Hearts', 'Spades']
  return ({type, x, y}) => {
    return <text x={x} y={y}>{suits[type]}</text>
  }
})()

const Rank = (()=> {
  const ranks = {1:'Ace', 11: 'Jack', 12: 'Queen', 13:'King'}
  return ({rank, x, y})=> {
    const realRank = ranks[rank] || rank
    const realX = ranks[rank] ? x-10 : x
    return <text x={realX} y={y}>{realRank}</text>
  }
})()



/*
  Functional component representing a playing card.
  Props:
    Suit: Number representing suit, JDCHS
    Rank: Number representing the rank, 1-13.
    the rest are svg props that will be fed into transform.
*/
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x:this.props.x,
      y:this.props.y
    }
    this.updatePosition = this.props.cbs.updatePosition(this)
    this.select = this.props.cbs.select(this)
    this.deselect = this.props.cbs.deselect(this)
  }

  render() {
    return (
      <g className="card"
        onMouseDown={this.select}
        onMouseUp={this.deselect}
        onMouseLeave={this.deselect}
        onMouseMove={this.updatePosition}
        transform={'rotate('+(this.props.rotate||0)+
          ') translate('+(this.state.x||0)+' '+(this.state.y||0)+
          ') scale('+(this.props.scale/100||.01)+')'}
      > //card is positioned purely through transform
        <rect
          width="100"
          height="160"
          rx="2"
          ry="2"
          style={backgroundStyle}
          ></rect>
        <Suit type={this.props.suit} x="20" y="80"/>
        <Rank x="10" y="15" rank={this.props.rank}/>
        <Rank x="80" y="155" rank={this.props.rank}/>
      </g>
    )
  }

  componentWillReceiveProps({evt}) {//currently only  used for updating position after card is reordered
    if ((this.props.evt === evt) || !evt) {return null};
    this.setState(({x, y, oldX, oldY})=>{
      return {
        x:x+evt.x-oldX,
        y:y+evt.y-oldY,
        oldX:evt.x,
        oldY:evt.y
      }
    })
  }
}

export default Card;

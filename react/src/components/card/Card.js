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
      x:props.x,
      y:props.y,
      oldX:0,
      oldY:0,
    }
    this.updatePosition = this.updatePosition.bind(this)
  }

  render() {
    return (
      <g className="card"
        onMouseDown={({pageX:x, pageY:y})=> this.setState({oldX:x, oldY:y, selected:true})}
        onMouseUp={()=> this.setState({selected:false})}
        onMouseLeave={()=> this.setState({selected:false})}
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

  updatePosition({pageX:newX, pageY:newY}) {//returns state update function given event context
    if (!this.state.selected) {return null}
    this.props.lift(this.props.height)
    this.setState((prev, props)=> {
      return {
        x:prev.x+newX-prev.oldX,
        y:prev.y+newY-prev.oldY,
        oldX: newX,
        oldY: newY
      }
    })
  }
}

export default Card;

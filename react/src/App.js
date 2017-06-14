import React, { Component } from 'react';
import './App.css';
import Card from './components/card/Card.js';
import _ from 'lodash/fp'

const svgStyle = {
  width:'100vw',
  height:'100vh'
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards:[],
      nextKey: 1
    };

    this.addRandomCard = this.addRandomCard.bind(this)
    this.cbs = {
      select: this.select.bind(this),
      deselect: this.deselect.bind(this),
      updatePosition: this.updatePosition.bind(this),
    }
  }

  render() {
    let drawnCards = this.state.cards.map((props)=> {
      return <Card {...props} />;
    });
    return (
      <div className="App">
        <svg
          onContextMenu={this.addRandomCard}
          style={svgStyle}>
          {drawnCards}
        </svg>
      </div>
    );
  }

  addRandomCard (evt) {
    evt.preventDefault()
    let {screenX:x, screenY:y} = evt //destructuring to save before synthetic event gets reused
    this.setState(prev=> {return {
      cards:prev.cards.concat([{
        x:x,
        y:y,
        suit:_.random(1,4),
        rank:_.random(1,13),
        scale:100,
        cbs:this.cbs,
        id: prev.nextKey,
        key:prev.nextKey
      }]),
      nextKey:prev.nextKey+1
    }})
  }

  select (card) {
    return ({screenX:x, screenY:y})=> {
      card.setState({oldX:x, oldY:y, selected:true})
    }
  }

  deselect (card) {
    return ()=> {card.setState({selected:false})}
  }

  updatePosition (card) {
    return ({screenX:x, screenY:y})=> {
      if (!card.state.selected) {return null}
      this.setState( prev=> {
        return {
          cards: _.flow([
            _.cloneDeep,
            _.filter(a=>{return a.key!==card.props.id}),
            cards=>{
              cards.push(_.merge(card.props, {evt: {x:x, y:y}, key:card.props.id}))
              return cards
            }
          ])(prev.cards)
        }
      }) 
    }
  }
}

export default App;

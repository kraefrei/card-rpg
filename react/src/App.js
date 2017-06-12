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
    this.lift = this.lift.bind(this)
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
        lift: this.lift,
        height: prev.nextKey,
        key:prev.nextKey
      }]),
      nextKey:prev.nextKey+1
    }})
  }

  lift (key) {
    this.setState(({cards})=>{
      const updated = _.cloneDeep(cards)
      updated.push(updated.splice(_.findIndex(updated, {key:key})-1, 1)[0])
      return {cards:updated}
    })
  }
}

export default App;

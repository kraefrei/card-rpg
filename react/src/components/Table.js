import React from 'react';
import { connect } from 'react-redux';
import { openMenu } from '../actions/menu.js';
import { bindActionCreators } from 'redux';
import Card from './Card.js';
import ContextMenu from './ContextMenu.js'

const svgStyle = {
  width:'100vw',
  height:'100vh'
};

const backdropStyle = {
  fill:'white'
}

function mapStateToProps ({cards:{items}, menu}) {
  return {items, menu}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ openMenu }, dispatch)
}

function Table({items, menu, openMenu}) {
  return (
    <svg style={svgStyle}>
      <rect
      className='backdrop'
      style={backdropStyle}
      x='0'
      y='0'
      width='10000'
      height='10000'
      onContextMenu={
        (evt)=> {
          evt.preventDefault()
          openMenu(evt.screenX, evt.screenY, 'Table')
        }
      }/>
      {items.valueSeq()
        .sort((a,b)=> a.height-b.height)
        .map(a => <Card id={a.key} key={a.key} />)/*TODO replace Card with polymorphic Item for deck support*/
      }
      {menu.visible &&
        <ContextMenu record={menu} />
      }
    </svg>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);

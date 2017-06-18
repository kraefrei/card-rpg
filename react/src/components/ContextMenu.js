import React from 'react';
import { connect } from 'react-redux';
import { closeMenu } from '../actions/menu.js';


const backdropStyle = {
  fill:'black',
  fillOpacity: .2,
  stroke:'transparent'
}

const entryStyle = {
  fill:'white',
  stroke:'black',
  strokeWidth:'.3'
}

function mapStateToProps ({menu:state}) {
  return {state}
}

function mapDispatchToProps (dispatch) {
  return {dispatch, closeMenu}
}

function ContextMenu ({
  state:{x,
  y,
  targetKey,
  items},
  closeMenu,
  dispatch
}) {
  return (
    <g>
      <rect
        className='backdrop'
        style={backdropStyle}
        onClick={()=>dispatch(closeMenu())}
        x='0' y='0' width='10000' height='10000'/>
      <g
        className="entries"
        transform={`translate(${x+30} ${y-90}) scale(5)`}
      >
        {items.entrySeq().map(([key, entryAction], i) => {
          return (
            <g
              className="entry"
              transform={`translate(0 ${i*8})`}
              key={i}
              onClick={
                ()=>dispatch(entryAction({x, y, targetKey}))
              }
            >
              <rect
                style={entryStyle}
                x='0'
                y='0'
                rx='1'
                ry='1'
                width='50'
                height='8'
                />
              <text fontSize='.3em' x='1' y='6'>{key}</text>
            </g>
          )
        })}
      </g>
    </g>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu)

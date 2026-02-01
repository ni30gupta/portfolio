'use client'

import React from 'react'

const BoxComp = React.forwardRef(({handleMark}, ref) => {

    const defaultStyle={
    width: '100px',
    height: '100px',
    backgroundColor: 'white',
    margin: '10px',
    border: '3px solid blue',
    cursor: 'pointer'
    }

    const handleMouseEnter = (e) => {
        e.target.style.backgroundColor = 'yellow';
        handleMark()
    }
  return (
    <div ref={ref} onMouseEnter={handleMouseEnter} style={defaultStyle}></div>
  )
})

BoxComp.displayName = 'BoxComp';

export default BoxComp;
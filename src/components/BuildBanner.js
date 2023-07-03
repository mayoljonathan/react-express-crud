import React, { Component } from 'react';

export default class BuildBanner extends Component {
  render() {
    return <div style={{ 
      position: 'fixed',
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: '#212121',
      color: 'white',
      textAlign: 'center',
      zIndex: 999
     }}>
      <p style={{ fontSize: `12px`, margin: `12px` }}>Running on {process.env.NODE_ENV} build</p>
    </div>
  }
}
import React from 'react';
import PropTypes from 'prop-types';

export default class InfoText extends React.Component {
  render() {
    return <div className="flex justify-center items-center" style={{height: `150px`}}>
      <p> {this.props.message} </p>
    </div>
  }
}

InfoText.propTypes = {
  message: PropTypes.string.isRequired,
};
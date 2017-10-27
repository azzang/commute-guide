import React, { Component } from 'react';
import '../styles/GetAnswerButton.css';

class GetAnswerButton extends Component {
  handleClick() {
    this.props.toggleIsAnswering();
  }

  getStyle(valueIfTrue, valueIfFalse) {
    return { display: this.props.isAnswering ? valueIfTrue : valueIfFalse };
  }

  render() {
    return (
      <button type="button" className="GetAnswerButton button-primary u-full-width"
        onClick={this.handleClick.bind(this)} disabled={this.props.isAnswering}>
        <span style={this.getStyle('none', 'inline')}>Find Out!</span>
        <span className="fa fa-circle-o-notch fa-spin"
          style={this.getStyle('inline-block', 'none')}></span>
      </button>
    );
  }
}

export default GetAnswerButton;

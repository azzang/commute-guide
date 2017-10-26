import React, { Component } from 'react';
import '../styles/CommuteGuide.css';
import Answer from './Answer';
import Question from './Question';

class CommuteGuide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userPreferences: {
        dateTime: '',
        minTemp: '',
        maxTemp: '',
        chanceOfPrecipitation: ''
      },
      isAnswering: false
    }

    this.setUserPreference = this.setUserPreference.bind(this);
    this.toggleIsAnswering = this.toggleIsAnswering.bind(this);
  }

  setUserPreference(preferenceName, obj) {
    const userPreferences = {...this.state.userPreferences};

    if (preferenceName === 'dateTime') { // obj = date object
      userPreferences[preferenceName] = obj;
    } else { // obj = event object
      const { target: { value }} = obj;
      userPreferences[preferenceName] = value === '' ? value : Number(value);
    }

    this.setState({ userPreferences });
  }

  toggleIsAnswering() {
    this.setState({ isAnswering: !this.state.isAnswering });
  }

  render() {
    return (
      <div className="CommuteGuide">
        <main>
          <Question userPreferences={this.state.userPreferences}
            setUserPreference={this.setUserPreference}
            isAnswering={this.state.isAnswering}
            toggleIsAnswering={this.toggleIsAnswering} />
          <Answer userPreferences={this.state.userPreferences}
            isAnswering={this.state.isAnswering}
            toggleIsAnswering={this.toggleIsAnswering} />
        </main>
        <footer>
          <small>Powered by <cite>Dark Sky</cite></small>
        </footer>
      </div>
    );
  }
}

export default CommuteGuide;

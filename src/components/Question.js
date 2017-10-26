import React, { Component } from 'react';
import UserPreferences from './UserPreferences';
import GetAnswerButton from './GetAnswerButton';
import '../styles/Question.css';

class Question extends Component {
  render() {
    return (
      <section className="Question">
        <header>
          <h1>Should You Bike or Metro?</h1>
          <p className="Question__prompt">
            It depends. Answer the questions below to find out!
          </p>
        </header>
        <main>
          <UserPreferences {...this.props.userPreferences}
            setUserPreference={this.props.setUserPreference} />
          <GetAnswerButton isAnswering={this.props.isAnswering}
            toggleIsAnswering={this.props.toggleIsAnswering} />
        </main>
      </section>
    );
  }
}

export default Question;

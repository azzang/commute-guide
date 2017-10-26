import React, { Component } from 'react';
import Datetime from 'react-datetime';
import '../styles/UserPreferences.css';

class UserPreferences extends Component {
  handlePreferenceChange(preference, obj) {
    this.props.setUserPreference(preference, obj);
  }

  render() {
    return (
      <section className="UserPreferences">
        <section>
          <h2>Date & Time</h2>
          <p>When is your commute?</p>
          <Datetime value={this.props.dateTime}
            onChange={this.handlePreferenceChange.bind(this, 'dateTime')}
            inputProps={{placeholder: 'Enter Date and Time'}}/>
        </section>
        <section>
          <h2>Temperature <small>(°F)</small></h2>
          <p>What is the minimum temperature you're willing to bike in?</p>
          <input type="number" min="-130" max="130"
            placeholder="Enter Minimum Temp."
            value={this.props.minTemp}
            onChange={this.handlePreferenceChange.bind(this, 'minTemp')}/>
          <p>What is maximum temperature?</p>
          <input type="number" min="-130" max="130"
            placeholder="Enter Maximum Temp."
            value={this.props.maxTemp}
            onChange={this.handlePreferenceChange.bind(this, 'maxTemp')}/>
        </section>
        <section>
          <h2>Chance of Precipitation <small>(%)</small></h2>
          <p>What is the maximum chance of precipitation you're willing to bike in?</p>
          <input type="number" min="0" max="100"
            placeholder="Enter Chance" step="1"
            value={this.props.chanceOfPrecipitation}
            onChange={this.handlePreferenceChange.bind(this, 'chanceOfPrecipitation')}/>
        </section>
      </section>
    );
  }
}

export default UserPreferences;

import React, { Component } from 'react';
import getWeatherGetter from './utils/api';
import '../styles/Answer.css';

class Answer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      iconName: '',
      isVisible: false
    }

    this.close = this.close.bind(this);
    this.handleFetchResponse = this.handleFetchResponse.bind(this);
    this.handleFetchError = this.handleFetchError.bind(this);
  }

  validate(preferences) {
    const { minTemp, maxTemp, chanceOfPrecipitation, dateTime } = preferences;

    if (typeof dateTime === 'string') {
      return 'Invalid date-time. Make sure to enter when you need to commute.';
    }

    if (typeof minTemp !== 'number' || minTemp < -130 || minTemp > 130) {
      return 'Invalid minimum temperature. Choose a temp. between -130 and 130°F.';
    }

    if (typeof maxTemp !== 'number' || maxTemp < -130 || maxTemp > 130) {
      return 'Invalid maximum temperature. Choose a temp. between -130 and 130°F.';
    }

    if (typeof chanceOfPrecipitation !== 'number' || chanceOfPrecipitation < 0 || chanceOfPrecipitation > 100) {
      return 'Invalid chance of rain. Choose a value between 0 and 100%.';
    }

    return null;
  }

  handleFetchError(err) {
    this.props.toggleIsAnswering();

    if (err && err.message) console.error(err.message);

    const message = 'Something went wrong while trying to fetch weather data. ' +
    "Email Jazz, and he'll look into it for you!";

    this.setState({ message, iconName: 'exclamation-triangle', isVisible: true });
  }

  handleFetchResponse(res) {
    this.props.toggleIsAnswering();

    const currentData = res.data && res.data.currently ? res.data.currently : null;
    const { userPreferences } = this.props;
    let message, iconName;

    if (!currentData) {
      message = "We weren't able to pull any weather data. " +
      "Email Jazz, and he'll look into it for you!";
      iconName = 'exclamation-triangle';
    } else if (!('precipProbability' in currentData) || !('temperature' in currentData)) {
      message = 'The weather data for your commute are incomplete, ' +
      'probably because the time you selected is too far in the future. ' +
      'Please check back later or select a new date-time.';
      iconName = 'exclamation-triangle';
    } else if (currentData.temperature < userPreferences.minTemp ||
    currentData.temperature > userPreferences.maxTemp) {
      message = 'The temperature during your commute should be ' +
      currentData.temperature +
      '°F. Given your temperature preferences, you should probably metro.';
      iconName = 'train';
    } else if ((currentData.precipProbability * 100) > userPreferences.chanceOfPrecipitation) {
      message = 'The chance of rain during your commute should be ' +
      currentData.precipProbability +
      '. Given your rain tolerance, you should probably metro.';
      iconName = 'train';
    } else {
      message = 'You can probably bike then!';
      iconName = 'bicycle';
    }

    this.setState({ message, iconName, isVisible: true });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isAnswering) {
      const message = this.validate(newProps.userPreferences);

      if (message) {
        newProps.toggleIsAnswering();
        return this.setState({ message, iconName: 'exclamation-triangle', isVisible: true });
      }

      return this.getWeatherData(newProps.userPreferences.dateTime)
        .then(this.handleFetchResponse)
        .catch(this.handleFetchError);
    }
  }

  componentDidMount() {
    // set default location to Washington D.C. area
    this.getWeatherData = getWeatherGetter(38.9072, -77.0369);

    // try to get actual location...
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.getWeatherData = getWeatherGetter(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    }
  }

  getStyle() {
    return { display: this.state.isVisible ? 'block' : 'none' };
  }

  close() {
    this.setState({ isVisible: false });
  }

  render() {
    return (
      <section className="Answer" style={this.getStyle()}>
        <header>
          <button type="button" className="Answer__close-btn" onClick={this.close}>✕</button>
        </header>
        <main>
          <span className={`Answer__icon fa fa-${this.state.iconName}`}></span>
          <p>{this.state.message}</p>
        </main>
      </section>
    );
  }
}

export default Answer;

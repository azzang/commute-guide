jest.mock('../utils/api');

import '../utils/configureEnzymeAdapter';
import Answer from '../Answer';
import React from 'react';
import { mount } from 'enzyme';

import { makeUserPreferences, makeResponseMock } from '../utils/factories';

describe('Answer', () => {
  const wrapper = mount(<Answer isAnswering={false} />);
  const answer = wrapper.instance();

  describe('getStyle', () => {
    const style = answer.getStyle();

    it('should return an object of length one', () => {
      expect(typeof style).toBe('object');
      expect(Object.keys(style).length).toBe(1);
    });

    it('should return an object with expected key/value pair', () => {
      expect(style).toHaveProperty('display', 'none');
    });
  });

  describe('close', () => {
    it('should set "isVisible"', () => {
      answer.close();
      expect(answer.state.isVisible).toEqual(false);
    });
  });

  describe('validate', () => {
    it('should return feedback if passed an invalid date-time', () => {
      const preferences = makeUserPreferences('foo', 0, 0, 0);
      expect(typeof answer.validate(preferences)).toBe('string');
    });

    it('should return feedback if passed an invalid minimum temperature', () => {
      const preferences = makeUserPreferences({}, 2000, 0, 0);
      expect(typeof answer.validate(preferences)).toBe('string');
    });

    it('should return feedback if passed an invalid maximum temperature', () => {
      const preferences = makeUserPreferences({}, 0, '', 0);
      expect(typeof answer.validate(preferences)).toBe('string');
    });

    it('should return feedback if passed an invalid chance of precipitation', () => {
      const preferences = makeUserPreferences({}, 0, 0, -1);
      expect(typeof answer.validate(preferences)).toBe('string');
    });

    it('should return null if passed valid user preferences', () => {
      const preferences = makeUserPreferences({}, 0, 0, 0);
      expect(answer.validate(preferences)).toBeNull();
    });
  });

  describe('handleFetchError', () => {
    afterEach(() => wrapper.setState({ iconName: '' }));

    it('should call toggleIsAnswering', () => {
      const toggleIsAnswering = jest.fn();

      wrapper.setProps({ toggleIsAnswering });
      answer.handleFetchError();

      expect(toggleIsAnswering).toHaveBeenCalled();
    });

    it('should log error message to console, if passed an error', () => {
      global.console.error = jest.fn();
      answer.handleFetchError(new Error('foo'));
      expect(console.error).toHaveBeenCalledWith('foo');
    });

    it('should set "iconName"', () => {
      answer.handleFetchError();
      expect(answer.state.iconName).toBe('exclamation-triangle');
    });
  });

  describe('handleFetchResponse', () => {
    afterEach(() => wrapper.setState({ iconName: '' }));

    it('should call toggleIsAnswering', () => {
      const toggleIsAnswering = jest.fn();

      wrapper.setProps({ toggleIsAnswering });
      answer.handleFetchResponse(makeResponseMock());

      expect(toggleIsAnswering).toHaveBeenCalled();
    });

    it('should set "iconName" if current data is missing', () => {
      answer.handleFetchResponse({});
      expect(answer.state.iconName).toBe('exclamation-triangle');
    });

    it('should set "iconName" if current data is incomplete', () => {
      answer.handleFetchResponse(makeResponseMock());
      expect(answer.state.iconName).toBe('exclamation-triangle');
    });

    it('should set "iconName" if current temperature is out of preferred range', () => {
      wrapper.setProps({ userPreferences: makeUserPreferences('', 0, 0, '') });
      answer.handleFetchResponse(makeResponseMock(130, 0));
      expect(answer.state.iconName).toBe('train');
    });

    it('should set "iconName" if current chance of precipitation conflicts with preference', () => {
      wrapper.setProps({ userPreferences: makeUserPreferences('', -130, 130, 0) });
      answer.handleFetchResponse(makeResponseMock(0, 1));
      expect(answer.state.iconName).toBe('train');
    });

    it('should set "iconName" if no conflicts found between preferences and current data', () => {
      wrapper.setProps({ userPreferences: makeUserPreferences('', -130, 130, 100) });
      answer.handleFetchResponse(makeResponseMock(0, 0));
      expect(answer.state.iconName).toBe('bicycle');
    });
  });

  describe('componentWillReceiveProps', () => {
    it('should not set "iconName" if "isAnswering" is false', () => {
      answer.componentWillReceiveProps({ isAnswering: false });
      expect(answer.state.iconName).toBe('');
    });

    describe('if "isAnswering" is true', () => {
      describe('if user preference is invalid', () => {
        const toggleIsAnswering = jest.fn();

        beforeAll(() => {
          answer.validate = jest.fn(() => 'Invalid Preference!');
          answer.componentWillReceiveProps({ isAnswering: true, toggleIsAnswering });
        });

        it('should call toggleIsAnswering', () => {
          expect(toggleIsAnswering).toHaveBeenCalled();
        });

        it('should set "iconName"', () => {
          expect(answer.state.iconName).toBe('exclamation-triangle');
        });
      });

      describe('if user preferences are valid', () => {
        beforeAll(() => {
          answer.validate = jest.fn();
          answer.handleFetchResponse = jest.fn();
          answer.handleFetchError = jest.fn();
        });

        it('should hit api and call handleFetchResponse if successful', () => {
          return answer.componentWillReceiveProps({
            isAnswering: true,
            userPreferences: makeUserPreferences({})
          }).then(() => expect(answer.handleFetchResponse).toHaveBeenCalled());
        });

        it('should hit api and call handleFetchError if unsuccessful', () => {
          return answer.componentWillReceiveProps({
            isAnswering: true,
            userPreferences: makeUserPreferences()
          }).then(() => expect(answer.handleFetchError).toHaveBeenCalled());
        });
      });
    });
  });
});

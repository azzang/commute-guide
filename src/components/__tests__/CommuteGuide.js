import '../utils/configureEnzymeAdapter';
import CommuteGuide from '../CommuteGuide';
import React from 'react';
import { shallow } from 'enzyme';

describe('CommuteGuide', () => {
  const wrapper = shallow(<CommuteGuide />);
  const commuteGuide = wrapper.instance();

  describe('setUserPreference', () => {
    it('should set minTemp to number if target value is not empty string', () => {
      ['0', '-1', '1', '1.23'].forEach(value => {
        commuteGuide.setUserPreference('minTemp', {target: {value}});
        expect(commuteGuide.state.userPreferences.minTemp).toEqual(Number(value));
      });
    });

    it('should set minTemp to empty string if target value is empty string', () => {
      commuteGuide.setUserPreference('minTemp', {target: {value: ''}});
      expect(commuteGuide.state.userPreferences.minTemp).toEqual('');
    });

    it('should set dateTime to passed object', () => {
      const date = new Date();
      commuteGuide.setUserPreference('dateTime', date);
      expect(commuteGuide.state.userPreferences.dateTime).toEqual(date);
    });
  });

  describe('toggleIsAnswering', () => {
    it('should toggle isAnswering', () => {
      commuteGuide.toggleIsAnswering();
      expect(commuteGuide.state.isAnswering).toEqual(true); // initial value was false
    });
  });
});

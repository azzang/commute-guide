import '../utils/configureEnzymeAdapter';
import UserPreferences from '../UserPreferences';
import React from 'react';
import { shallow } from 'enzyme';

describe('UserPreferences', () => {
  const setUserPreference = jest.fn();
  const wrapper = shallow(<UserPreferences setUserPreference={setUserPreference} />);

  describe('handlePreferenceChange', () => {
    it('should call setUserPreference on input change', () => {
      const minTempInput = wrapper.find('input[type="number"]').first();
      const eventMock = {target: {value: '1'}};

      minTempInput.simulate('change', eventMock);

      expect(setUserPreference).toHaveBeenCalledWith('minTemp', eventMock);
    });
  });
});

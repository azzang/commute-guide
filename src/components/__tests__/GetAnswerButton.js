import '../utils/configureEnzymeAdapter';
import GetAnswerButton from '../GetAnswerButton';
import React from 'react';
import { mount } from 'enzyme';

describe('GetAnswerButton', () => {
  const wrapper = mount(<GetAnswerButton isAnswering={false} />);

  it('should not be disabled if "isAnswering" prop is false', () => {
    const isDisabled = wrapper.find('button').html().includes('disabled=""');
    expect(isDisabled).toBe(false);
  });

  it('should be disabled if "isAnswering" prop is true', () => {
    wrapper.setProps({ isAnswering: true });
    const isDisabled = wrapper.find('button').html().includes('disabled=""');
    expect(isDisabled).toBe(true);
  });

  describe('handleClick', () => {
    it('should call toggleIsAnswering when button is clicked', () => {
      const toggleIsAnswering = jest.fn();

      // set isAnswering back to false so button is not disabled
      wrapper.setProps({ isAnswering: false, toggleIsAnswering });
      wrapper.simulate('click');

      expect(toggleIsAnswering).toHaveBeenCalled();
    });
  });

  describe('getStyle', () => {
    const style = wrapper.instance().getStyle('foo', 'bar');

    it('should return an object of length one', () => {
      expect(typeof style).toBe('object');
      expect(Object.keys(style).length).toBe(1);
    });

    it('should return an object with expected key/value pair', () => {
      expect(style).toHaveProperty('display', 'bar');
    });
  });
});

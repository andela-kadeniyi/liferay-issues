import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'

import Home from './Home.react'
const wrapper = shallow(<Home />)

describe('Home', () => {

  it('contains the right text', () => {
    expect(wrapper.find('h1').text()).toEqual('Life Ray Issues')
  })

  it('contains a form', () => {
    expect(wrapper.find('form').length).toEqual(1)
  })
});

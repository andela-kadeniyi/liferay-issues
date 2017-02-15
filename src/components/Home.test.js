import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import Home from './Home.react'
import { fetchGithubIssues } from './Home.react'

const wrapper = shallow(<Home />)

describe('Home', () => {
  before(() => sinon.spy(fetchGithubIssues, 'fetch'))

  it('contains the right text', () => {
    expect(wrapper.find('h1').text()).toEqual('Life Ray Issues')
  });
});

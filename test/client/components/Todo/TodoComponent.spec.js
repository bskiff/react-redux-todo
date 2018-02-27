import * as React from 'react';
import { shallow } from 'enzyme';

import { expect } from 'chai';

import { TodoComponent, mapStateToProps } from '../../../../client/components/Todo/TodoComponent';

const simpleTodos = [
  {
    title: 'Test',
    isComplete: false,
  },
];

describe('TodoComponent', () => {
  function renderComponent(todos = simpleTodos) {
    const state = {
      todo: {
        todos,
      },
    };

    const props = {
      ...mapStateToProps(state),
    };

    const wrapper = shallow(<TodoComponent />);

    return { wrapper, props };
  }

  it('should not render an empty component', () => {
    const { wrapper } = renderComponent();

    expect(wrapper.isEmptyRender()).to.equal(false);
  });
});

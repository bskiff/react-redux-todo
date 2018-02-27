import { auth } from '../../../client/reducers/auth';

import { expect } from 'chai';
import { LOGIN_SUCCESS } from '../../../client/actions/auth';

describe('auth reducer', () => {
  it('should return the default state with no parameters', () => {
    const result = auth();
    expect(result).to.deep.equal({
      error: null,
      user: {
        username: '',
      },
    });
  });

  it('should set the username on LOGIN_SUCCESS', () => {
    const initial = auth();
    const result = auth(initial, {
      type: LOGIN_SUCCESS,
      data: {
        username: 'foobar',
      },
    });

    expect(result).to.deep.equal({
      error: null,
      user: {
        username: 'foobar',
      },
    });
  });
});

/* 
    Using webpack's css loader will cause mocha tests to fail, as it is trying to interpret the css as js. 
    This compiler will tell mocha to ignore any require() statements that end in '.css'.
*/

function noop() {
  return null;
}

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;

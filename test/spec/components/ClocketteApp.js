'use strict';

describe('ClocketteApp', function () {
  var React = require('react/addons');
  var ClocketteApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ClocketteApp = require('components/ClocketteApp.js');
    component = React.createElement(ClocketteApp);
  });

  it('should create a new instance of ClocketteApp', function () {
    expect(component).toBeDefined();
  });
});

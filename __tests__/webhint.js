'use strict';

const WebhintPlugin = require('../src');

describe('Run webhint hint', () => {
  test('Plugin required parameters', () => {
    expect(() => {
      const webhintPlugin = new WebhintPlugin({});
      webhintPlugin.preRun();
    }).toThrowError('No valid url');
  });
});

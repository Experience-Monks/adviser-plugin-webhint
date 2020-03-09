const Analyzer = require('hint').Analyzer;

const userConfig = {
  extends: ['web-recommended']
};

const webhint = Analyzer.create(userConfig);

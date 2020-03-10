const Analyzer = require('hint').Analyzer;

const userConfig = {
  connector: 'jsdom',
  extends: ['web-recommended'],
  formatters: []
};

async function run() {
  console.log('starting');
  const webhint = Analyzer.create(userConfig);

  const results = await webhint.analyze('https://www.google.com');

  console.log('returned results');

  if (!results.length) {
    throw new Error('No results returned.');
  }

  console.log('results', results);
}

run();

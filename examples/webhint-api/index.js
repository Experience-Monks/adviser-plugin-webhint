const Analyzer = require('hint').Analyzer;

const userConfig = {
  connector: 'jsdom',
  extends: ['web-recommended'],
  formatters: [],
  hintsTimeout: 60000
};

console.log('starting');
const webhint = Analyzer.create(userConfig);

webhint.analyze('http://localhost:8081/').then(results => {
  webhint.close();
  console.log('returned results');

  if (!results.length) {
    throw new Error('No results returned.');
  }

  results.forEach(result => {
    console.log(`Result for: ${result.url}`);

    result.problems.forEach(problem => {
      console.log(`${problem.hintId} - ${problem.resource} - ${problem.message}`);
    });
  });
});

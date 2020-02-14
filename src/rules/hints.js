const Adviser = require('adviser');
const chalk = require('chalk');

class Hints extends Adviser.Rule {
  constructor(context) {
    super(context);
    this.results = context.shared;
  }

  async run(sandbox) {
    const report = {};
    const { options } = sandbox.ruleContext;
    this.results.forEach(result => {
      const problems = result.problems.filter(
        problem =>
          typeof options.minSeverity === 'number' &&
          problem.severity >= options.minSeverity &&
          Array.isArray(options.ignore) &&
          !options.ignore.includes(problem.hintId)
      );

      report.message = `${problems.length} webhint hint${problems.length > 1 ? 's' : ''} failed`;

      problems.forEach(problem => {
        report.verbose += `${chalk.bold(problem.hintId)}:\n\t${problem.message}\n\tSeverity:${chalk.bold(
          problem.severity
        )}\n\n  `;
      });
    });
    sandbox.report(report);
  }
}

Hints.meta = {
  category: 'general',
  description: 'Runs Webhint "hints" on provided URL',
  recommended: true
};

module.exports = Hints;

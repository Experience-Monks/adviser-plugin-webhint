const Adviser = require('adviser');
const chalk = require('chalk');

class Hints extends Adviser.Rule {
  constructor(context) {
    super(context);
    this.results = context.shared;

    if (this.context.options.minSeverity) {
      if (typeof this.context.options.minSeverity !== 'number') {
        throw new Error(`Wrong "minSeverity" options, should be a number`);
      } else if (this.context.options.minSeverity < 0 || this.context.options.minSeverity > 5) {
        throw new Error(`Wrong "minSeverity" options, should be within the range 1 - 5`);
      }
    }

    if (this.context.options.ignore && !Array.isArray(this.context.options.ignore)) {
      throw new Error(`Wrong "ignore" argument, an array is expected`);
    }

    this.minSeverity = this.context.options.minSeverity || 0;
    this.ignore = this.context.options.ignore || [];
  }

  async run(sandbox) {
    const report = {};
    this.results.forEach(result => {
      const problems = result.problems.filter(
        problem => problem.severity >= this.minSeverity && !this.ignore.includes(problem.hintId)
      );

      report.message = `${problems.length} webhint hint${problems.length > 1 ? 's' : ''} failed`;

      let verboseOutput = '\n ';
      problems.forEach(problem => {
        verboseOutput += `
  ${chalk.bold(problem.hintId)}:
    Message: ${problem.message}
    Severity: ${problem.severity}
    Resource: ${problem.resource}\n\n `;
      });
      report.verbose = `Failed hints:${verboseOutput.trimEnd()}`;
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

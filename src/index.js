'use strict';

const path = require('path');
const fs = require('fs');

const requireIndex = require('requireindex');
const isURL = require('is-url');
const Adviser = require('adviser');
const Analyzer = require('hint').Analyzer;

class WebhintPlugin extends Adviser.Plugin {
  constructor(settings) {
    super(settings);

    if (!Object.prototype.hasOwnProperty.call(settings, 'url') || !isURL(settings.url)) {
      throw new Error(`No valid url provided.`);
    }

    this.url = settings.url;
    this.options = settings.options || {};
    this.configPath = settings.configPath;
    this.rules = requireIndex(path.join(__dirname, '/rules'));
  }

  async preRun(context) {
    let config = null;
    if (this.configPath) {
      const fullConfigPath = path.join(context.filesystem.dirname, this.configPath);

      if (!fs.existsSync(fullConfigPath)) {
        throw new Error(`Config file was not found in ${fullConfigPath}`);
      }

      try {
        config = require(path.join(context.filesystem.dirname, this.configPath));
      } catch (error) {
        throw new Error(`Error found retrieving lighthouse config file ${fullConfigPath}`);
      }
    }

    try {
      const webhint = Analyzer.create(config, this.options);
      const analyzerResult = await webhint.analyze(this.url, this.options);
      webhint.close();

      if (!analyzerResult || !analyzerResult.length) {
        // It should throw at least one Analyzer Result object
        throw new Error('No results returned.');
      }

      context.addShareableData(analyzerResult[0].problems);
    } catch (error) {
      throw new Error(`Webhint couldn't run, ${error}`);
    }
  }
}

WebhintPlugin.meta = {
  description: 'Adviser plugin wrapper of webhint',
  recommended: true
};

module.exports = WebhintPlugin;

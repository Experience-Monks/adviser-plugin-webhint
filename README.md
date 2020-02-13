# adviser-plugin-lighthouse

Plugin for adviser to run webhint hints checking on a given URL

- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## Installation

You'll first need to install [Adviser](https://www.npmjs.com/package/adviser):

```
$ npm i adviser --save-dev
```

Next, install `adviser-plugin-webhint`:

```
$ npm install adviser-plugin-webhint --save-dev
```

**Note:** If you installed Adviser globally (using the `-g` flag) then you must also install `adviser-plugin-webhint` globally.

## Usage

Add `webhint` to the plugins section of your `.adviserrc` configuration file. You can omit the `adviser-plugin-` prefix:

```json
{
  "plugins": ["webhint"]
}
```

If you don't have a `.adviserrc` you can create one running `$ adviser --init`

Then configure the rules you want to use under the rules section.
You can ignore any of webhint's hints and set a minimum severity

```json
{
  "plugins": ["webhint"],
  "rules": {
    "webhint/hints": [
      "error",
      {
        "ignore": ["http-cache"],
        "minSeverity": 3
      }
    ]
  }
}
```

You can also create a webhint configuration file following webhint configurations
https://webhint.io/docs/user-guide/configuring-webhint/summary/

### Full example

```json
{
  "plugins": ["webhint"],
  "rules": {
    "webhint/hints": [
      "error",
      {
        "ignore": ["http-cache"],
        "minSeverity": 3
      }
    ]
  },
  "settings": {
    "webhint": {
      "url": "www.google.com",
      "configPath": "dev.wh.config.json"
    }
  }
}
```

## Tests

If you would like to contribute and later on test your changes there are a couple ways explained below.

### Unit code

The package (`adviser-plugin-webhint`) is setup to run tests under the folder `__tests__` with Jest. Save your tests there and they will run before each code push and by travis once the PR is created.

### Integration tests

To run your rules with `adviser`, we recommend you to create an empty folder (We have one under `./examples/integration`) with:

- An example package.json
- An `adviser` configuration file. You can grab the example in this README or generate one using `$ adviser --init` (adviser must be installed globally or using `npx`)
- Link this repo to the example project.
  - Run `$ npm link` in the `adviser-plugin-webhint` root
  - Run `$ npm link adviser-plugin-webhint` in the example project root

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting
pull requests.

## Supported Rules

- [hints](docs/rules/hints.md) - Inspect the webhint hints

## License

[MIT](LICENSE)

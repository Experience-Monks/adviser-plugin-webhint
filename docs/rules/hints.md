# Webhint Hints

It will throw an error if the site does not meet or pass the supplied individual webhint hints.

Use the adviser argument `--verbose` for extra information to see which specific areas failed.

## Syntax

```
  "webhint/hints": [
    "error",
    {
      ignore: [],
      minSeverity: 3,
    }
  ]
```

### ignore

Array of strings - List of hint ids

Optional

Possible values: `['axe/keyboard', 'http-compression']`

### minSeverity

Integer [1-5] - Severity

Required

Possible values: `minSeverity: 3`

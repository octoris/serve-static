# serve-static

A static serve middleware for octoris

## Install

```cli
npm i @octoris/static
```

## Arguments

- loc: `String` - The directory containing static files you want to watch. (Directory must start at root level of app)
- opts: `Object` - Some optional options that can be provided to the middleware

## Options

- encoding: `String` - The encoding type you want to be given to `.end`

## Usage

The static middleware is meant to be used with the `composeRoutes` function for global stage listening.

```js
const { router, response, methods} = require('octoris')
const serve = require('@octoris/static')

function handler () {
  return new Promise(resolve => send(200, 'Okay!'))
}

const home = router.route([router.fixed('/')], [methods.GET(handler)])

router.composeRoutes({}, [home], [serve('public')])
```

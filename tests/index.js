const path = require('path')
const test = require('tape')
const serve = require('../index')

function generateContext (fn, p = '/public/test.txt') {
  return {
    response: {
      end: fn
    },
    request: {
      method: 'GET',
      url: p,
      _parsedUrl: path.parse(p)
    }
  }
}

test('serveStatic(loc, opts) - Basic', t => {
  const context = generateContext(d => {
    context.data = d
    return true
  })
  const stat = serve('public', { encoding: 'utf8' })

  stat(context)
    .then(ctx => {
      t.same(ctx.data, 'Text file!\n')
      t.end()
    })
    .catch(console.error)
})

test('serveStatic(loc, opts) - Skip', t => {
  const context = generateContext(d => {
    context.data = d
    return true
  }, '/home')
  const stat = serve('public')

  stat(context)
    .then(ctx => {
      t.notOk(ctx.data)
      t.end()
    })
    .catch(console.error)
})

test('serveStatic(loc, opts) - Root', t => {
  const context = generateContext(d => {
    context.data = d
    return true
  }, '/')
  const stat = serve('public')

  stat(context)
    .then(ctx => {
      t.notOk(ctx.data)
      t.end()
    })
    .catch(console.error)
})

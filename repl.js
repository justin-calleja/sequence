const repl = require('repl')
const Maybe = require('folktale/data/maybe')
const sequence = require('./lib')

const { Just, Nothing } = Maybe

const r = repl.start('> ')

r.context.sequence = sequence
r.context.Maybe = Maybe
r.context.Just = Just
r.context.Nothing = Nothing
r.context.res1 = sequence(Maybe.of)([Just(1), Just(2), Just(3)])   // => Just([1, 2, 3])
r.context.res2 = sequence(Maybe.of)([Just(1), Just(2), Nothing()]) // => Nothing()
console.log(r.context.res1)
console.log(r.context.res2)

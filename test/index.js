import test from 'ava'
import sequence from '..'
import Maybe from 'folktale/data/maybe'
import Result from 'folktale/data/result'
import Task from 'folktale/data/task'
import Validation from 'folktale/data/validation'

const { Just, Nothing } = Maybe
const { Success } = Validation

test('Can transform [Just(1), Just(2), Just(3)] to Just([1, 2, 3])', t => {
  const expected = Just([1, 2, 3])
  const value = sequence(Maybe.of)([Just(1), Just(2), Just(3)])

  t.deepEqual(value, expected)
})

test('Can transform [Just(1), Just(2), Nothing()] to Nothing()', t => {
  const expected = Nothing()
  const value = sequence(Maybe.of)([Just(1), Just(2), Nothing()])

  t.deepEqual(value, expected)
})

test('Expect Just([]) when transforming [] with Maybe.of', t => {
  const expected = Just([])
  const value = sequence(Maybe.of)([])

  t.deepEqual(value, expected)
})

test('Expect Ok([]) when transforming [] with Result.of', t => {
  const expected = Result.Ok([])
  const value = sequence(Result.of)([])

  t.deepEqual(value, expected)
})

test('Expect Success([]) when transforming [] with Validation.of', t => {
  const expected = Success([])
  const value = sequence(Validation.of)([])

  t.deepEqual(value, expected)
})

test('Works with iterables', t => {
  const expected = Just([100, 200, 300])
  const iterable = {}
  iterable[Symbol.iterator] = function* () {
    yield Just(100)
    yield Just(200)
    yield Just(300)
  }
  const value = sequence(Maybe.of)(iterable)

  t.deepEqual(value, expected)
})

test('Throws a descriptive Error when a value in given iterable is not an Applicative', t => {
  t.throws(
    () => sequence(Maybe.of)([Just(1), 2, Just(3)]),
    'Make sure that all values in the iterable you pass in to sequence have a .map, .ap, and .of method as specified in the Fantasy Land spec. This value failed the test: 2'
  )
})

test('Throws a descriptive Error when a value in given iterable is not an Applicative', t => {
  t.throws(
    () => sequence(() => 200)([Just(1), Just(2)]),
    'Make sure that applicativeReturningFn you pass in to sequence returns a value which has .map, .ap, and .of methods as specified in the Fantasy Land spec. This value failed the test: 200'
  )
})

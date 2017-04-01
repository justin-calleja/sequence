const append = x => arr => [].concat(arr, [x])

const isApplicative = x => (
  typeof x.map === 'function'
  && typeof x.ap === 'function'
  && typeof x.of === 'function'
)

/**
 * This is a value as specified [in the Fantasy Land spec for Applicative](https://github.com/fantasyland/fantasy-land#applicative).
 * This means that a value of this type needs to have `of`, `ap` and `map` methods with the properties specified in the
 * Fantasy Land spec.
 * @typedef {Object} Applicative
 */

/**
 * This function is curried.
 *
 * The `applicativeReturningFn` is expected to return a value of type Applicative.
 * Also, it is expected that the Applicative returned by `applicativeReturningFn`
 * is of the same kind as the Applicatives in the given iterable (2nd curried param).
 * e.g. if `applicativeReturningFn` returns a Maybe, iterable is expected to have Maybe
 * values.
 *
 * Just like the Ramda function with the same name, this function:
 * > "Transforms a Traversable of Applicative into an Applicative of Traversable."
 *
 * e.g. if `applicativeReturningFn` returns a Maybe, and iterable is made up of Maybe
 * T values, then this function returns a `Maybe<Array<T>>` where T is a type like String etc…
 *
 * @param  {Function} [applicativeReturningFn] A function that returns an Applicative
 * @param  {Iterable<Applicative>} [iterable] An iterable of Applicatives
 * @return {Applicative<Array<T>>}
 * @see Applicative
 */
const sequence = applicativeReturningFn => iterable => {
  const arr = Array.from(iterable)
  const initApplicativeValue = applicativeReturningFn([])
  if (!isApplicative(initApplicativeValue))
    throw new Error(`Make sure that applicativeReturningFn you pass in to sequence returns a value which has .map, .ap, and .of methods as specified in the Fantasy Land spec. This value failed the test: ${initApplicativeValue}`)

  return arr.reduce(
    (acc, applicative) => {
      if (!isApplicative(applicative))
        throw new Error(`Make sure that all values in the iterable you pass in to sequence have a .map, .ap, and .of method as specified in the Fantasy Land spec. This value failed the test: ${applicative}`)
      return applicative.map(v => append(v)).ap(acc)
    },
    initApplicativeValue
  )
}

module.exports = sequence

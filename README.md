# `sequence` [![Build status][travis-image]][travis-url] [![NPM version][version-image]][version-url] [![Js Standard Style][standard-image]][standard-url]

This package exports a function similar to [Ramda's sequence](http://ramdajs.com/docs/#sequence) function.

Note that it is strictly curried (see demo usage below).

## Known issue

For this package to work, the `Applicative` (see below) ADT value you use must have the following sematics for the `.ap` method: `fnApplicative.ap(valueApplicative)`. This is [Fantasy Land pre-v1.0.0 semantics](https://github.com/fantasyland/fantasy-land/releases/tag/v1.0.0).

[Folktale 2](https://github.com/origamitower/folktale)'s Applicative ADTs have this behaviour for their `.ap` method (and support v1.0.0+ semantics of `.ap` via `valueApplicative['fantasy-land/ap'](fnApplicative)`).

`sequence` uses the `.ap` method. This means `sequence` will work with Folktale 2 ADTs (as well as Folktale 1 mico-libs like [data.maybe](https://github.com/folktale/data.maybe) etc…).

In the future, it is likely that a major version update of this package will take a config Object as the first curried function which can configure which sematics of `.ap` to use. Apart from this, it will be possible to add to this config enabling/disabling of "basic type checking" to make sure we have the required methods that make up an "Applicative". This "basic type checking" is on by force in version `^1.0.0` - which could get expensive for large iterables.

## Install

`npm i @justinc/sequence`

### Demo

(See tests for more example usage). Also, there's a REPL file you can run with `node repl.js`.

```js
const Maybe = require('folktale/data/maybe')
const sequence = require('@justinc/sequence')

const { Just, Nothing } = Maybe

// "strictly curried" means you cannot use short-hands like `sequence(Maybe.of, [Just(1), Just(2), Just(3)])`.
// That's extra functionality provided by Ramda (not provided here).
sequence(Maybe.of)([Just(1), Just(2), Just(3)]) // ==> Just([1, 2, 3])
```

## Functions

<dl>
<dt><a href="#sequence">sequence([applicativeReturningFn], [iterable])</a> ⇒ <code>Applicative.&lt;Array.&lt;T&gt;&gt;</code></dt>
<dd><p>This function is curried.</p>
<p>The <code>applicativeReturningFn</code> is expected to return a value of type Applicative.
Also, it is expected that the Applicative returned by <code>applicativeReturningFn</code>
is of the same kind as the Applicatives in the given iterable (2nd curried param).
e.g. if <code>applicativeReturningFn</code> returns a Maybe, iterable is expected to have Maybe
values.</p>
<p>Just like the Ramda function with the same name, this function:</p>
<blockquote>
<p>&quot;Transforms a Traversable of Applicative into an Applicative of Traversable.&quot;</p>
</blockquote>
<p>e.g. if <code>applicativeReturningFn</code> returns a Maybe, and iterable is made up of Maybe
T values, then this function returns a <code>Maybe&lt;Array&lt;T&gt;&gt;</code> where T is a type like String etc…</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Applicative">Applicative</a> : <code>Object</code></dt>
<dd><p>This is a value as specified <a href="https://github.com/fantasyland/fantasy-land#applicative">in the Fantasy Land spec for Applicative</a>.
This means that a value of this type needs to have <code>of</code>, <code>ap</code> and <code>map</code> methods with the properties specified in the
Fantasy Land spec.</p>
</dd>
</dl>

<a name="sequence"></a>

## sequence([applicativeReturningFn], [iterable]) ⇒ <code>Applicative.&lt;Array.&lt;T&gt;&gt;</code>
This function is curried.

The `applicativeReturningFn` is expected to return a value of type Applicative.
Also, it is expected that the Applicative returned by `applicativeReturningFn`
is of the same kind as the Applicatives in the given iterable (2nd curried param).
e.g. if `applicativeReturningFn` returns a Maybe, iterable is expected to have Maybe
values.

Just like the Ramda function with the same name, this function:
> "Transforms a Traversable of Applicative into an Applicative of Traversable."

e.g. if `applicativeReturningFn` returns a Maybe, and iterable is made up of Maybe
T values, then this function returns a `Maybe<Array<T>>` where T is a type like String etc…

**Kind**: global function  
**See**: Applicative  

| Param | Type | Description |
| --- | --- | --- |
| [applicativeReturningFn] | <code>function</code> | A function that returns an Applicative |
| [iterable] | <code>[Iterable.&lt;Applicative&gt;](#Applicative)</code> | An iterable of Applicatives |

<a name="Applicative"></a>

## Applicative : <code>Object</code>
This is a value as specified [in the Fantasy Land spec for Applicative](https://github.com/fantasyland/fantasy-land#applicative).
This means that a value of this type needs to have `of`, `ap` and `map` methods with the properties specified in the
Fantasy Land spec.

**Kind**: global typedef  

[travis-image]: https://img.shields.io/travis/justin-calleja/sequence.svg?style=flat-square
[travis-url]: https://travis-ci.org/justin-calleja/sequence

[version-image]: https://img.shields.io/npm/v/@justinc/sequence.svg?style=flat-square
[version-url]: https://npmjs.org/package/@justinc/sequence

[standard-image]: https://img.shields.io/badge/code-standard-yellow.svg?style=flat-square
[standard-url]: https://github.com/feross/standard

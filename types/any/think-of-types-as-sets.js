"use strict";
// think of types as sets of values
// above, the '&' operator computes the intersection of two types. this means 'PersonSpan' will contain values that have properties
// of both 'Person' and 'Lifespan', as seen below:
let person = {
    name: 'jerome',
    birth: new Date('1945/06/23'),
    death: new Date('2021/06/13')
};
let car = {
    make: 'chrysler',
    model: 'sebring',
    miles: 200000,
};
// be weary that the 'extends' keyword can also appear as a contraint in a generic type, and it also means "subset of" in this context:
function getKey(val, key) {
    /* ... gets key ... */
}
// the above function will accept the following 'key' arguments because they are all subsets of string:
getKey({}, 'x');
getKey({}, Math.random() > .5 ? 'a' : 'b');
getKey({}, Document.name);
// but ts will complain if we give the function the following 'key' argument because it is not a subset of string:
getKey({}, 12);
const pts = [{ x: 1, y: 1 }, { x: 2, y: 0 }];
sortBy(pts, 'x'); // OK
sortBy(pts, 'y'); // OK
sortBy(pts, Math.random() > .5 ? 'x' : 'y'); // OK
sortBy(pts, 'z'); // error
function sortBy(vals, key) {
    /* ... */
}
// if we hover over 'K', we see that it is of type 'never' (the empty set). this is because although union types are loosely defined
// as a set of subtypes, only one of those subtypes can concretely define a union type at runtime. since no subtype concretely defines
// a union type at compilation, there are no keys 'keyof' can return.
// try to build an intuition for the following equations:
//
// keyof (A | B) = (keyof A) & (keyof B)
// keyof (A & B) = (keyof A) | (keyof B)

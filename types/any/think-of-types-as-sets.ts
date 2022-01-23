// think of types as sets of values

// thinking of types as sets of values is a useful mental model when manipulating them

// while we program, values do not exist. it is only at runtime that values populate and get manipulated by the machine.
// instead, we are faced with types. we cannot know at compile time (aka while we are programming)
// what values will be introduced into our system/program. bc of this fact, we orient our programs around the sets of
// values that * could theoretically * exist in our system/program. these sets of values are the definition of a type.
// and these sets of values are the way we should think about types in ts.

interface Person {

    name: string;

}

interface Lifespan {

    birth: Date;
    death?: Date;

}

type PersonSpan = Person & Lifespan;

// above, the '&' operator computes the intersection of two types. this means 'PersonSpan' will contain values that have properties
// of both 'Person' and 'Lifespan', as seen below:

let person: PersonSpan = { 

    name: 'jerome',
    birth: new Date('1945/06/23'),
    death: new Date('2021/06/13')

}

// perhaps a more common way to write a similar type would be with 'extends', as follows:

interface Automobile {

    miles: number;

}

interface Sedan extends Automobile {

    make: string,
    model: string

}

let car: Sedan = {

    make: 'chrysler',
    model: 'sebring',
    miles: 200000,

}

// be weary that the 'extends' keyword can also appear as a contraint in a generic type, and it also means "subset of" in this context:

function getKey<K extends string>(val: any, key: K) {

    /* ... gets key ... */ 

}

// the above function will accept the following 'key' arguments because they are all subsets of string:

getKey({}, 'x');
getKey({}, Math.random() > .5 ? 'a' : 'b');
getKey({}, Document.name);

// but ts will complain if we give the function the following 'key' argument because it is not a subset of string:

getKey({}, 12);

// this is also a useful model to keep with finite sets, such as the ones you might get from the following snippet:

interface Point {

    x: number;
    y: number;

}
type pointKeys = keyof (Point);                                     // here the type is 'x' | 'y'

const pts: Point[] = [{x: 1, y: 1}, {x: 2, y: 0}];

sortBy(pts, 'x');                                                   // OK
sortBy(pts, 'y');                                                   // OK
sortBy(pts, Math.random() > .5 ? 'x' : 'y');                        // OK
sortBy(pts, 'z')                                                    // error

function sortBy<K extends keyof (T), T>(vals: T[], key: K) {

    /* ... */

}


// it is interesting to note that ts cannot guarantee keys exists for union types, for example:

type K = keyof ( Person | Lifespan );

// if we hover over 'K', we see that it is of type 'never' (the empty set). this is because although union types are loosely defined
// as a set of subtypes, only one of those subtypes can concretely define a union type at runtime. since no subtype concretely defines
// a union type at compilation, there are no keys 'keyof' can return.

// try to build an intuition for the following equations:
//
// keyof (A | B) = (keyof A) & (keyof B)
// keyof (A & B) = (keyof A) | (keyof B)
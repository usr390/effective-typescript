// know how to tell whether a symbol is in type space or value space

// a symbol is ts can exist in either the type space or value space

interface cylinder {

    radius: number;
    height: number;

}

const cylinder = (radius: number, height: number) => ({radius, height});

// above, our cylinder interface introduces a symbol in type space, and 'const Cylinder' introduces a symbol w the same name in
// value space. these symbols are unrelated and have nothing to do with eo.

// depending on the context, when we type 'Cylinder', we'll either be referring to the type or the value. this can sometimes
// lead to errors:

function calculateErrors(shape: unknown) {

    if (shape instanceof cylinder) {

        // shape.radius;

    }

}

// the error in the above snippet came from our use of 'instanceof'. we meant to check if shape was of type 'cylinder', but we
// used a runtime operator that operates on values resulting in 'cylinder' refering to the function instead.

// it's not always clear at first glance whether a symbol is in type space or value space; we have to tell from the context in 
// which the symbol appears.
// this can get especially confusing because many type-space constructs look exactly the same as value-space constructs.
// literals are an example of this:

type T1 = 'string literal'
type T2 = 123;
const V1 = 'string literal'
const V2 = 123;

// generally, symbols introduced after 'type' or 'interface' are in type space while those introduced after 'const' or 'let'
// are in value space.

// use the ts playground to build an intuition for value and type spaced symbols. ts playground shows you the resulting js of
// ts code, so if a symbol disappears in the transpiled js it was probably in type space.

// the class and enum constructs introduce both a type and a value. 
// let's turn the 'cylinder' interface into a class:

class cylinder_CreatedWithClass {

    radius = 1;
    height = 1;

}

function calculateArea2(shape: unknown) {

    if (shape instanceof cylinder_CreatedWithClass) {

        shape;
        shape.radius;

    }

}

// there are many keywords and operators that mean different things in a type or value context. for instance:

/*

type T1 = typeof p                                              // type is Person
type T2 = typeof email                                          // type is (p: Person, subject: string, body: string) => response

const V1 = typeof p                                             // value is "object"
const V2 = type of email                                        // value is "function"

*/

// the snippet above reveals some interesting ts behavior:
// in type context,  typeof takes a value and returns its ts type.
// in value context, typeof is the js runtime 'typeof' operator and it returns the runtime type of the symbol. remember there
// are only 6 js runtime types - string, number, boolean, undefined, object, and function

// typeof always operates on values, it cannot be applied to types. we note that the 'class' keyword introduces both a type 
// and a value, so what is the 'typeof' class? it depends on the context:

const v = typeof cylinder_CreatedWithClass;
type T = typeof cylinder_CreatedWithClass;

// above, 'v' is assigned the union of all js types. this is because we're using the js runtime operator 'typeof' which must return
// the set of all possible types since the operand symbol can't be evaluated until runtime. this can be thought of as returning 
// the 'set of all sets'.
// 'T' is not assigned the type or value of 'cylinder_CreatedWithClass', instead, it is assigned its constructor! so T's type will in
// fact be 'function'. we prove this below by calling the function and creating an instance of 'cylinder_CreatedWithClass'.


declare let fn: T;
const temp = new fn();

// hovering over 'temp' we see that the constructor has successfully instantiated the class. 

// you can go between the constructor type and the instance type using the 'InstanceType' generic:

type Cy = InstanceType<typeof cylinder_CreatedWithClass>;


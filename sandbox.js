// know how to tell whether a symbol is in type space or value space
var cylinder = function (radius, height) { return ({ radius: radius, height: height }); };
// above, our cylinder interface introduces a symbol in type space, and 'const Cylinder' introduces a symbol w the same name in
// value space. these symbols are unrelated and have nothing to do with eo.
// depending on the context, when we type 'Cylinder', we'll either be referring to the type or the value. this can sometimes
// lead to errors:
function calculateErrors(shape) {
    if (shape instanceof cylinder) {
        // shape.radius;
    }
}
var V1 = 'string literal';
var V2 = 123;
// generally, symbols introduced after 'type' or 'interface' are in type space while those introduced after 'const' or 'let'
// are in value space.
// use the ts playground to build an intuition for value and type spaced symbols. ts playground shows you the resulting js of
// ts code, so if a symbol disappears in the transpiled js it was probably in type space.
// the class and enum constructs introduce both a type and a value. 
// let's turn the 'cylinder' interface into a class:
var cylinder_CreatedWithClass = /** @class */ (function () {
    function cylinder_CreatedWithClass() {
        this.radius = 1;
        this.height = 1;
    }
    return cylinder_CreatedWithClass;
}());
function calculateArea2(shape) {
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
// typeof always operates on values, it cannot be applied to types. we note that the 'class' keyword introduces both a type and a value, so
// what is the 'typeof' class? it depends on the context:
var v = typeof cylinder_CreatedWithClass;
var temp = new fn();

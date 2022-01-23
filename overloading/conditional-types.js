"use strict";
////////////////////////////////
// SYMBOL CHART:              //
//  ~~   - TypeScript error   //
// /* */ - TypeScript code    //
////////////////////////////////
// you cannot overload a function based on typescript types.
// remember that types are removed at compilation so overloading in this manner is not possible.
// the following snippet demonstrates this erroneous approach:
/*
function add(a: number, b: number) {}
function add(a: string, b: string) {}               // ~~ Duplicate function implementation
*/
// fortunately, ts provides mechanisms for method overloading but they operate entirely at the type level.
// you can provide multiple declarations for a function, however they must implement the same code:
/*
function add(a: number, b: number): number;         // function type declaration
function add(a: string, b: string): string;         // function type declaration
function add(a: any, b: any) {                      // function implementation
    return a + b;
}
*/
// this approach produces a small bug, shown in the following snippet:
/*
function foo(argument1: number | string, argument2: number | string) {

    add(argument1, argument2);                      // ~~ Argument of type 'string | number' is not assignable to parameter of type 'number'

}
*/
// although 'add' can accept numbers or strings, it cannot accept their union type ('string | number').
// we can (and should) circumvent this using conditional types as follows:
/*
function add<T extends number | string, R extends number | string> (x: T, y: R): R extends string ? string : number;
function add(x: any, y: any) {
    return x + x;
}

function foo(argument1: number | string, argument2: number | string) {
    
    add(argument1, argument2);                      // OK

}
*/ ////////////////////////////////
// SYMBOL CHART:              //
//  ~~   - TypeScript error   //
// /* */ - TypeScript code    //
////////////////////////////////
// you cannot overload a function based on typescript types.
// remember that types are removed at compilation so overloading in this manner is not possible.
// the following snippet demonstrates this erroneous approach:
/*
function add(a: number, b: number) {}
function add(a: string, b: string) {}               // ~~ Duplicate function implementation
*/
// fortunately, ts provides mechanisms for method overloading but they operate entirely at the type level.
// you can provide multiple declarations for a function, however they must implement the same code:
/*
function add(a: number, b: number): number;         // function type declaration
function add(a: string, b: string): string;         // function type declaration
function add(a: any, b: any) {                      // function implementation
    return a + b;
}
*/
// this approach produces a small bug, shown in the following snippet:
/*
function foo(argument1: number | string, argument2: number | string) {

    add(argument1, argument2);                      // ~~ Argument of type 'string | number' is not assignable to parameter of type 'number'

}
*/
// although 'add' can accept numbers or strings, it cannot accept their union type ('string | number').
// we can (and should) circumvent this using conditional types as follows:
/*
function add<T extends number | string, R extends number | string> (x: T, y: R): R extends string ? string : number;
function add(x: any, y: any) {
    return x + x;
}

function foo(argument1: number | string, argument2: number | string) {
    
    add(argument1, argument2);                      // OK

}
*/ 

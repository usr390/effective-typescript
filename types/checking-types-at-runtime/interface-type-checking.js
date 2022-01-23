"use strict";
// checking types at runtime.
// types get erased at compilation, so we cannot use them to control the flow of a program.
// we work around this by reconstructing the type at runtime.
/* if we are working with interfaces (as in the example below), one way of reconstructing the type is by
   checking for the presence of a property belonging to that interface. in this example, that's 'height' */
// UNCOMMENT CODE BELOW
/*

interface Square {
    width: number;
}

interface Rectangle extends Square {
    height: number;
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {

    if ('height' in shape) {
        return shape.width * shape.height;
    } else {
        return shape.width * shape.width;
    }
}

*/ 

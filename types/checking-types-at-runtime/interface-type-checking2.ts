// checking types at runtime

// types get erased at compilation, so we cannot use them to control the flow of a program.
// we work around this by reconstructing the type at runtime.

/* 

if we are working with interfaces (as in the example below), one way of reconstructing the type is by 
checking for the presence of a property belonging to that interface, like in the example shown in 'interface-type-checking.ts'.
   
yet another way is to introduce 'tag' properties to our interfaces that directly store the interface type in a string, as shows
below. 
   
*/

// UNCOMMENT CODE BELOW

/*
interface Square {
    kind: 'square',
    width: number
}

interface Rectangle {
    kind: 'rectangle',
    width: number,
    height: number
}

type Shape = Square | Rectangle;

const shape: Shape = {kind: 'rectangle', width: 20, height: 2}             // can hold both Square and Rectangle types.

console.log(calculateArea(shape));

function calculateArea(shape: Shape) {
    if (shape.kind === 'square') return Math.pow(shape.width, 2);
    else return shape.width * shape.height
}
*/


/* THINGS I FOUND INTERESTING

the Shape type is an example of a 'tagged union'. they make it very easy to recover type information at runtime so they are
ubiquitous in TypeScript.

*/
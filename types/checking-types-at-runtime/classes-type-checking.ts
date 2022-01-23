// some constructs, like classes, introduce both a type (in the same way interfaces do) along with a value (unlike interfaces).
/* 

typescript values are availble at runtime (types are not), so we can use these constructs and their values
to typecheck as shown below

*/

// UNCOMMENT CODE BELOW

/*
class Square {
    constructor(public width: number) {}
}

class Rectangle extends Square {
    constructor(public width: number, public height: number) {
        super(width);
    }
}

type Shape = Square | Rectangle;                                            // 'Rectangle' in this line refers to the type

const shape: Shape = new Square(20);
console.log(calculateArea(shape));

function calculateArea(shape: Shape) {

    if (shape instanceof Rectangle)                                         // 'Rectangle' in this line referes to the value, subtle difference but important
        return shape.width * shape.height;
     else
        return shape.width * shape.width
    
}
*/
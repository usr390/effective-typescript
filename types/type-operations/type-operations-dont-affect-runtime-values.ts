// the following snippet attemps to type convert 'val' (to a number).
// this doesn't work because 'as number' is a type operation (specifically, a type assertion), and type operations 
// cannot affect runtime values.
// remember that types get removed at compile time, so type operations have nothing to operate on while the 
// program is running. 

/*
function asNumber(val: number | string) {
    return val as number;
}
*/

// to achieve type conversion, we must check the value's runtime type and do conversion using javascript constructs
// as follows:

/*
function asNumber2(val: number | string) {
    return typeof(val) === 'string' ? Number(val) : val;
}
*/
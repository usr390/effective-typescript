// get comfortable with structural typing

// keep in mind that js is inherently duck typed.
// this can sometimes lead to surprises beacause the compiler's understanding of a type can be broader than what the programmer expected

// to introduce the idea of structural typing (which is how ts models duck typing), we start with this 2D Vector interface:

interface Vector2D {
    x: number;
    y: number;
}

// then write a method to calculate a vector's length:

function calculateLength(val: Vector2D) {
    return Math.sqrt(val.x * val.x + val.y * val.y);
}

// now we introduce the concept of a named vector (same as Vector2D but with an extra property to hold an associated identifier):

interface NamedVector2D {
    name: string;
    x: number;
    y: number;
}

// notice below how 'calculateLength' works when given an argument of type 'NamedVector2D'. 
// structurally, Vector2D and NamedVector2D share the properties needed to execute calculateLength, so ts allows it:

const namedVector: NamedVector2D = {x: 3, y: 4, name: "vector1"}
calculateLength(namedVector);                                           // OK

// although this makes code flexible, we should be aware of the problems duck typing introduces.
// let's highlight this by introducing a 3DVector type and creating a function to normalize it (normalizing means converting length to 1):

interface Vector3D {
    x: number;
    y: number;
    z: number;
}

function normalizeLength(v: Vector3D) {

    const legnth = calculateLength(v);                                  // call to 'calculateLength', argument type is Vector2D but we're passing it type Vector3D

    return {
        x: v.x / length,
        y: v.y / length,
        z: v.z / length
    };

}

// running this method is likely to produce error because 'calculateLength' ignores 'z' values found in type Vector3D, which needs to be
// used to normalize vectors correctly.
// by default, the compiler will not complain about this because it is within the bounds of structural typing.

// as you write methods, it's easy to imagine that they will be called with arguments having the properties you've declared (sealed types).
// this is not the case in ts. types are open, and thus there may exist properties on method arguments that we don't expect to exist.
// this can sometimes lead to surprises:

function calculateLength3D_INCORRECT(v: Vector3D) {

    let length = 0;

    for (const axis of Object.keys(v)) {

        // const coord = v[axis];                                          // ~~~ Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Vector3D'
        // length += Math.abs(coord);

    }

    return length;

}

// this snippet loops through Vector3D's keys and adds each key value to 'length'. the intent is to calculate vector lengths by adding
// x, y, and z, but this approach is faulty: it assumes parameter types are sealed. if there are additional properties we fail to take
// into account (name, address, etc) they will be added to 'length' which will almost always result in runtime or logical errors.

// one simple solution to this problem would be to use a non-iterative approach:

function calculateLength3D_CORRECT(v: Vector3D) {

    return Math.abs(v.x * v.x) + Math.abs(v.y * v.y) + Math.abs(v.z + v.z);

}

// as with interfaces, structural typing can also lead to surprises with classes (which are compared structurally for assignability):

class C {

    foo: string;
    bar: number;

    constructor(foo: string, bar: number) {
        this.foo = foo;
        this.bar = 0;
        console.log('instance of class C')
    }

}

const c = new C('instance of C', 3);
console.log(c);
const d: C = {  foo: 'object literal', bar: 4 };
console.log(d);

// here, 'd' is assignable to C becuase they are structurally compatible. however, we draw importance to the fact that 'd' is
// not technically an instance of C, it did not execute its constructor method. this is troublesome if C has methods that
// operate on post-constructor state. it's useful to keep this in mind.

// structural typing is also beneficial when writing tests. we highlight this by supposing a method that runs a query on a database
// and processes the results:

/*
interface Author {
    first: string,
    last: string
}

function getAuthors(database: databasePostgress): Author[] {
    const authorRows = database.RunQuery(`SELECT FIRST, LAST FROM AUTHORS`);
    return authorRows.map(row => ({first: row[0], last: row[1]}));
}
*/

// to test the code above, we'd have to create a mock database. a better approach is to use structural typing and define a narrower
// interface:

interface DB {
    runQuery: (sql: string) => any[]
}

function getAuthors(database: DB) {
    const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
    return authorRows.map(row => ({first: row[0], second: row[1]}));
}

// with this snippet, we can continue passing 'databasePostgress' arguments to 'getAuthors' without explicitly telling ts it 
// implements 'DB'. this is because of structural typing ('databsePostgress' also contains a method named 'runQuery', like DB)

// now that we have narrowed the interface, we can give our tests simpler, more generic objects (instead specifically Postgress objects):

test('getAuthors', () => {
    
    const authors = getAuthors({

        runQuery(sql: string) {
            return [['Toni', 'Morrison'],['Maya', 'Angelou']]
        }

    });

    expect(authors).toEqual([

        {first: 'Toni', second: 'Morrison'},
        {first: 'Maya', second: 'Angelou'}
    
    ]);

});

// the object passed in to 'getAuthors' is a DB and hardcodes runQuery's return value for testing.
// by introducing an abstraction (DB), we have freed our logic and tests from the details of a specific implementation (Postgress).
// again, this is because of structural typing allowing increased flexibility in method parameters.

// THINGS TO REMEMBER
// * understand that js is duck typed and ts uses structural typing to model this
// * values assignable to your interfaces MIGHT have properties beyond those explicitly listed in your type declaration.
// * classes also follow structural typing rules
// * use structural typing to facilitate unit testing
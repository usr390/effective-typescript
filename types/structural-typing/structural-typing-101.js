"use strict";
// get comfortable with structural typing
// then write a method to calculate a vector's length:
function calculateLength(val) {
    return Math.sqrt(val.x * val.x + val.y * val.y);
}
// notice below how 'calculateLength' works when given an argument of type 'NamedVector2D'. 
// structurally, Vector2D and NamedVector2D share the properties needed to execute calculateLength, so ts allows it:
const namedVector = { x: 3, y: 4, name: "vector1" };
calculateLength(namedVector); // OK
function normalizeLength(v) {
    const legnth = calculateLength(v); // call to 'calculateLength', argument type is Vector2D but we're passing it type Vector3D
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
function calculateLength3D_INCORRECT(v) {
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
function calculateLength3D_CORRECT(v) {
    return Math.abs(v.x * v.x) + Math.abs(v.y * v.y) + Math.abs(v.z + v.z);
}
// as with interfaces, structural typing can also lead to surprises with classes (which are compared structurally for assignability):
class C {
    constructor(foo, bar) {
        this.foo = foo;
        this.bar = 0;
        console.log('instance of class C');
    }
}
const c = new C('instance of C', 3);
console.log(c);
const d = { foo: 'object literal', bar: 4 };
console.log(d);
function getAuthors(database) {
    const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
    return authorRows.map(row => ({ first: row[0], second: row[1] }));
}
// with this snippet, we can continue passing 'databasePostgress' arguments to 'getAuthors' without explicitly telling ts it 
// implements 'DB'. this is because of structural typing ('databsePostgress' also contains a method named 'runQuery', like DB)
// now that we have narrowed the interface, we can give our tests simpler, more generic objects (instead specifically Postgress objects):
test('getAuthors', () => {
    const authors = getAuthors({
        runQuery(sql) {
            return [['Toni', 'Morrison'], ['Maya', 'Angelou']];
        }
    });
    expect(authors).toEqual([
        { first: 'Toni', second: 'Morrison' },
        { first: 'Maya', second: 'Angelou' }
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

"use strict";
// try to limit the use of 'any'
// freely using 'any' in your ts eliminates much of the benefit of using the language in the first place.
// as you start using ts, it becomes tempting to use 'any' types when you don't understand an error, think the 
// type checker is incorrect, or simply don't want to take the time to write type declarations.
// ts wrtiters should try to avoid this.
// let's examine some pitfalls associated with the 'any' type:
let age = 12;
age = '12';
age += 1;
console.log(age); // logs '121' instead of '13'
// using the 'as any' type assertion in the snippet above, we allow 'age' to accept string types.
// because of this, a logical error is introduced in our arithmetic.
// 'any' types can also negatively impact the integrity of functions.
// the following snippet demonstrates this:
function calculateAge(birthdate) {
    // ... calculates age ... //
}
let birthdateString = '1990-08-03';
calculateAge(birthdateString);
// the problem is that our function accepts 'birthdateString' when it should only operate on arguments of type 'Date'.
// 'any' lets this slip through, and will likely cause incorrect output.
// THINGS TO REMEMBER
// * there are no language services (intelligent autocomplete, contextual documentation, renaming, etc) for 'any' types
// * the 'any' type effectively silences the ts type checker.
// * the 'any' type hides the type design of your project.
// * the 'any' type undermines confidence in the ts type system, for you and your team.

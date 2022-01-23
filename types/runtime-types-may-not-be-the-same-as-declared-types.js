"use strict";
// runtime types may not be the same as declared types
// interesting to note that the default branch of this switch can be hit, though at first glance it seems like it
// should be flagged for dead code.
// by passing an argument like "'ON'" to our 'setLighSwitch' function, we inadvertently trigger the default branch.
// we must remember that although boolean is the declared type of the 'val' parameter, it gets removed at compile 
// time and so the parameter may accept values of different types (such as a string in this example)
// avoid this mismatching of types as much as possible, and know that it's possible for a value to have types 
// other than the ones you declared
function setLightSwitch(value) {
    switch (value) {
        case true:
            switchOn();
            break;
        case false:
            switchOff();
            break;
        default:
            console.log("Supraise biitch");
    }
}
function switchOn() { console.log("light is on"); }
function switchOff() { console.log("light is off"); }
